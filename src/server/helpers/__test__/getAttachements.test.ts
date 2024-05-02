import { getAttachments } from "../getAttachments";
import { fetchLocalMedia } from "../../utils/fetchLocalMedia";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";

// Mocking external dependencies
jest.mock("../../utils/fetchLocalMedia", () => ({
  fetchLocalMedia: jest.fn(),
}));

jest.mock("../getStrapiService", () => ({
  getFileService: jest.fn(),
}));

describe("Unit Tests for getAttachments Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch local media successfully", async () => {
    const mockMedia = {
      id: 1,
      name: "media.jpg",
      alternativeText: null,
      caption: null,
      width: 800,
      height: 600,
      hash: "hash_value",
      ext: ".jpg",
      mime: "image/jpeg",
      size: 123456,
      url: "/path/to/media.jpg",
      previewUrl: null,
      provider: "local",
      folderPath: "/folder/path",
      createdAt: new Date(),
      updatedAt: new Date(),
      isSelectable: true,
      type: "image",
    };
    const mockBuffer = Buffer.from("mock-data");
    (fetchLocalMedia as jest.Mock).mockResolvedValue(mockBuffer as never);

    const attachments = await getAttachments([mockMedia]);

    expect(fetchLocalMedia).toHaveBeenCalledWith(mockMedia.url);
    expect(attachments).toEqual([
      {
        content: mockBuffer,
        contentType: mockMedia.mime,
        filename: mockMedia.name,
      },
    ]);
  });

  it("should handle errors when fetching local media", async () => {
    const mockMedia = {
      id: 1,
      name: "media.jpg",
      alternativeText: null,
      caption: null,
      width: 800,
      height: 600,
      hash: "hash_value",
      ext: ".jpg",
      mime: "image/jpeg",
      size: 123456,
      url: "/path/to/media.jpg",
      previewUrl: null,
      provider: "local",
      folderPath: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      isSelectable: true,
      type: "image",
    };

    const mockError = { stack: "Failed to load local media" };
    (fetchLocalMedia as jest.Mock).mockRejectedValue({
      errors: [mockError],
    } as never);

    const attachments = await getAttachments([mockMedia]);

    expect(attachments).toEqual([]);
  });
});

