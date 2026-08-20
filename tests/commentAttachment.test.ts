import {
  isImageAttachment,
  isImageFile,
} from "lib/services/comment/comment";

describe("comment attachment kind", () => {
  it("treats IMAGE kind as an image", () => {
    expect(
      isImageAttachment({
        id: "1",
        createdAt: "",
        file: "/a.jpg",
        kind: "IMAGE",
      })
    ).toBe(true);
  });

  it("treats DOCUMENT kind as a download", () => {
    expect(
      isImageAttachment({
        id: "1",
        createdAt: "",
        file: "/a.pdf",
        filename: "lab.pdf",
        kind: "DOCUMENT",
      })
    ).toBe(false);
  });

  it("falls back to pdf filename when kind is missing", () => {
    expect(
      isImageAttachment({
        id: "1",
        createdAt: "",
        file: "/a.pdf",
        filename: "lab.pdf",
      })
    ).toBe(false);
  });

  it("classifies local files by type or pdf name", () => {
    expect(
      isImageFile(new File(["x"], "pic.png", { type: "image/png" }))
    ).toBe(true);
    expect(
      isImageFile(new File(["x"], "lab.pdf", { type: "application/pdf" }))
    ).toBe(false);
  });
});
