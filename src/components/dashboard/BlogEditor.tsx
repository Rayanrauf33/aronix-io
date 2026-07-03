"use client"

import { useCallback } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TiptapImage from "@tiptap/extension-image"
import TiptapLink from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import type { LucideIcon } from "lucide-react"
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  FileCode,
  Link as LinkIcon,
  ImagePlus,
  Undo2,
  Redo2,
  Minus,
} from "lucide-react"

interface BlogEditorProps {
  content: string
  onChange: (html: string) => void
}

export function BlogEditor({ content, onChange }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      TiptapImage,
      TiptapLink.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Start writing your post..." }),
      Underline,
    ],
    content,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML())
    },
  })

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes("link").href as string | undefined
    const url = window.prompt("Enter URL:", prev ?? "https://")
    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    }
  }, [editor])

  const addImage = useCallback(() => {
    if (!editor) return
    const url = window.prompt("Enter image URL:")
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) return null

  const groups: { items: ToolbarItem[]; key: string }[] = [
    {
      key: "format",
      items: [
        { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold"), label: "Bold" },
        { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic"), label: "Italic" },
        { icon: UnderlineIcon, action: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive("underline"), label: "Underline" },
        { icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive("strike"), label: "Strikethrough" },
      ],
    },
    {
      key: "heading",
      items: [
        { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }), label: "Heading 2" },
        { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }), label: "Heading 3" },
      ],
    },
    {
      key: "list",
      items: [
        { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList"), label: "Bullet list" },
        { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList"), label: "Ordered list" },
      ],
    },
    {
      key: "block",
      items: [
        { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote"), label: "Blockquote" },
        { icon: Code, action: () => editor.chain().focus().toggleCode().run(), active: editor.isActive("code"), label: "Inline code" },
        { icon: FileCode, action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive("codeBlock"), label: "Code block" },
        { icon: Minus, action: () => editor.chain().focus().setHorizontalRule().run(), active: false, label: "Horizontal rule" },
      ],
    },
    {
      key: "insert",
      items: [
        { icon: LinkIcon, action: setLink, active: editor.isActive("link"), label: "Link" },
        { icon: ImagePlus, action: addImage, active: false, label: "Image" },
      ],
    },
    {
      key: "history",
      items: [
        { icon: Undo2, action: () => editor.chain().focus().undo().run(), active: false, label: "Undo", disabled: !editor.can().undo() },
        { icon: Redo2, action: () => editor.chain().focus().redo().run(), active: false, label: "Redo", disabled: !editor.can().redo() },
      ],
    },
  ]

  return (
    <div className="editor-wrap">
      <div className="editor-toolbar">
        {groups.map((group, gi) => (
          <span key={group.key} style={{ display: "contents" }}>
            {gi > 0 && <span className="toolbar-sep" />}
            {group.items.map(({ icon: Icon, action, active, label, disabled }) => (
              <button
                key={label}
                type="button"
                onClick={action}
                data-active={active}
                disabled={disabled}
                title={label}
              >
                <Icon size={16} />
              </button>
            ))}
          </span>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

interface ToolbarItem {
  icon: LucideIcon
  action: () => void
  active: boolean
  label: string
  disabled?: boolean
}
