import { Media } from "@strapi/types/dist/types/core/attributes/media";
import { MailAttachment, StrapiMedia } from "../types";
import { fetchLocalMedia } from "../utils/fetchLocalMedia";
import { getFileService } from "./getStrapiService";

const fetchMedia = async (
  media: StrapiMedia,
  fileService: any
): Promise<Blob | Buffer> => {
  if (media.provider === "local") {
    try {
      const buffer = fetchLocalMedia(media.url);
      return buffer;
    } catch (error) {
      console.error("Failed to load local media");
      throw error;
    }
  }

  let signedMedia: Media;

  try {
    signedMedia = await fileService.signFileUrls(media);
  } catch (error) {
    console.error("Failed to sign file");
    throw error;
  }

  // @ts-ignore
  const request = await fetch(signedMedia.url);
  if (!request.ok) {
    throw new Error("Failed to fetch file");
  }

  try {
    const blob = await request.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  } catch (error) {
    console.error("Failed to get file buffer");
    throw error;
  }
};

export const getAttachments = async (medias: StrapiMedia[]) => {
  const fileService = getFileService();

  const attachments: MailAttachment[] = [];
  const fetchingPromises = medias.map((media) => {
    return fetchMedia(media, fileService)
      .then((blob) => {
        attachments.push({
          content: blob,
          contentType: media.mime,
          filename: media.name,
        });
      })
      .catch(console.error);
  });

  await Promise.allSettled(fetchingPromises);

  return attachments;
};
