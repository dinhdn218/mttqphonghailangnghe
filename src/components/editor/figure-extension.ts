import { Node, mergeAttributes } from "@tiptap/core";

// Node "figure": ảnh kèm chú thích (figcaption) có thể sửa.
// HTML sinh ra: <figure><img src alt/><figcaption>chú thích</figcaption></figure>
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    figure: {
      setFigure: (options: {
        src: string;
        alt?: string;
        caption?: string;
      }) => ReturnType;
    };
  }
}

export const Figure = Node.create({
  name: "figure",
  group: "block",
  content: "inline*", // phần chú thích (figcaption) sửa được
  draggable: true,
  isolating: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure",
        contentElement: "figcaption",
        getAttrs: (el) => {
          const img = (el as HTMLElement).querySelector("img");
          return {
            src: img?.getAttribute("src") ?? null,
            alt: img?.getAttribute("alt") ?? null,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src, alt } = HTMLAttributes as { src?: string; alt?: string };
    return [
      "figure",
      {},
      ["img", mergeAttributes({ class: "rounded-lg" }, { src, alt })],
      ["figcaption", {}, 0], // 0 = chỗ chứa nội dung chú thích
    ];
  },

  addCommands() {
    return {
      setFigure:
        ({ src, alt, caption }) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: { src, alt: alt ?? "" },
            content: caption ? [{ type: "text", text: caption }] : [],
          }),
    };
  },
});
