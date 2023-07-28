import { MailAttachment, StrapiMedia } from "../types";
import { fetchLocalMedia } from "../utils/fetchLocalMedia";
import { getFileService } from "./getStrapiService";

const fetchMedia = async (
  media: StrapiMedia,
  fileService: any
): Promise<Blob | Buffer> => {
  if (media.provider === "local") {
    const buffer = fetchLocalMedia(media.url);
    return buffer;
  }
  const signedMedia = await fileService.signFileUrls(media);

  // @ts-ignore
  const request = await fetch(signedMedia.url);
  const blob = await request.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
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
