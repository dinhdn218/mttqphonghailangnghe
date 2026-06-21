import sanitizeHtml from "sanitize-html";

// Làm sạch HTML do Tiptap sinh trước khi render (chống XSS — Nghị định 85/2016).
// Chỉ cho phép đúng các thẻ/thuộc tính mà trình soạn thảo tạo ra.
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "em",
    "s",
    "u",
    "h2",
    "h3",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
    "img",
    "code",
    "pre",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height", "class"],
  },
  // Chỉ cho phép link/ảnh qua http(s); chặn javascript:, data: (trừ ảnh nếu cần)
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: { img: ["http", "https"] },
  transformTags: {
    // Bắt buộc rel an toàn cho link mở tab mới.
    a: (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        ...(attribs.target === "_blank"
          ? { rel: "noopener noreferrer" }
          : {}),
      },
    }),
  },
};

export function sanitizePostHtml(dirty: string): string {
  return sanitizeHtml(dirty, OPTIONS);
}
