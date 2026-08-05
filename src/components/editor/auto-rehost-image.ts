import TiptapImage from "@tiptap/extension-image";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { addToast } from "@heroui/react";
import { rehostImageFromUrl } from "@/app/admin/bai-viet/media-actions";

// Ảnh dán vào editor từ trang khác (copy nguyên bài Facebook chẳng hạn) mang
// theo <img src="https://scontent...fbcdn.net/..."> — CDN đó chặn hotlink nên
// ảnh sẽ vỡ khi hiển thị trên site của mình. `transformPastedHTML` (khai báo ở
// rich-text-editor.tsx) đánh dấu các ảnh ngoài bằng data-pending="1"; extension
// này theo dõi các ảnh có đánh dấu đó và tự tải lại lên Cloudinary của mình.
export const AutoRehostImage = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      pending: { default: null, rendered: false },
      rid: { default: null, rendered: false },
    };
  },

  parseHTML() {
    return [
      ...(this.parent?.() ?? []),
      {
        tag: "img[data-pending]",
        getAttrs: (el) => ({
          src: (el as HTMLElement).getAttribute("src"),
          alt: (el as HTMLElement).getAttribute("alt"),
          pending: true,
          rid: Math.random().toString(36).slice(2),
        }),
      },
    ];
  },

  addProseMirrorPlugins() {
    const processed = new Set<string>();

    return [
      new Plugin({
        key: new PluginKey("autoRehostImage"),
        view(editorView) {
          const scan = () => {
            const { doc } = editorView.state;
            const jobs: { rid: string; src: string }[] = [];
            doc.descendants((node) => {
              if (
                node.type.name === "image" &&
                node.attrs.pending &&
                node.attrs.rid &&
                !processed.has(node.attrs.rid)
              ) {
                processed.add(node.attrs.rid);
                jobs.push({ rid: node.attrs.rid, src: node.attrs.src });
              }
            });

            for (const job of jobs) {
              rehostImageFromUrl(job.src)
                .then((result) => {
                  const tr = editorView.state.tr;
                  let found = false;
                  editorView.state.doc.descendants((node, pos) => {
                    if (node.type.name === "image" && node.attrs.rid === job.rid) {
                      found = true;
                      tr.setNodeMarkup(pos, undefined, {
                        ...node.attrs,
                        src: result.ok ? result.url : node.attrs.src,
                        pending: false,
                        rid: null,
                      });
                    }
                  });
                  if (found) editorView.dispatch(tr);
                  if (!result.ok) {
                    addToast({
                      title:
                        "Có ảnh dán từ trang khác không tự tải lại được — vui lòng xoá và tải lên lại bằng nút \"🖼 Ảnh\".",
                      color: "warning",
                    });
                  }
                })
                .catch(() => {
                  /* đã log ở server action, bỏ qua ở client */
                });
            }
          };

          // Chạy sau khi paste đã parse xong nội dung vào doc.
          setTimeout(scan, 0);

          return {
            update: scan,
          };
        },
      }),
    ];
  },
});
