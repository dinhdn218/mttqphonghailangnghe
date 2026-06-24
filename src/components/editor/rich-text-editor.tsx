"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapImage from "@tiptap/extension-image";
import { useCallback } from "react";
import { UploadButton } from "@/components/editor/upload-button";
import { Figure } from "@/components/editor/figure-extension";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    immediatelyRender: false, // tránh lỗi hydration khi SSR
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, autolink: true }),
      TiptapImage.configure({ HTMLAttributes: { class: "rounded-lg" } }),
      Figure,
      Placeholder.configure({ placeholder: placeholder ?? "Nhập nội dung…" }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-red max-w-none min-h-[240px] px-3 py-2 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) {
    return (
      <div className="min-h-[290px] rounded-lg border border-gray-300 bg-gray-50" />
    );
  }

  return (
    <div className="rounded-lg border border-gray-300 focus-within:border-red-500">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = useCallback(() => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Đường dẫn liên kết:", previous ?? "");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-1.5">
      <Btn on={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <b>B</b>
      </Btn>
      <Btn on={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <i>I</i>
      </Btn>
      <Btn on={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <s>S</s>
      </Btn>
      <Divider />
      <Btn on={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        H2
      </Btn>
      <Btn on={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        H3
      </Btn>
      <Divider />
      <Btn on={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • Danh sách
      </Btn>
      <Btn on={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        1. Số
      </Btn>
      <Btn on={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        ❝ Trích
      </Btn>
      <Divider />
      <Btn on={editor.isActive("link")} onClick={setLink}>
        🔗 Liên kết
      </Btn>
      <UploadButton
        label="🖼 Ảnh"
        className="rounded px-2 py-1 text-sm text-gray-700 transition hover:bg-gray-200"
        onUploaded={(r) => {
          const caption =
            window.prompt("Chú thích ảnh (để trống nếu không cần):") ?? "";
          editor
            .chain()
            .focus()
            .setFigure({ src: r.url, alt: caption, caption })
            .run();
        }}
      />
      <Divider />
      <Btn on={false} onClick={() => editor.chain().focus().undo().run()}>
        ↶
      </Btn>
      <Btn on={false} onClick={() => editor.chain().focus().redo().run()}>
        ↷
      </Btn>
    </div>
  );
}

function Btn({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded px-2 py-1 text-sm transition ${
        on ? "bg-red-600 text-white" : "text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-0.5 w-px self-stretch bg-gray-300" />;
}
