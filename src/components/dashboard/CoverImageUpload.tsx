"use client"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface CoverImageUploadProps {
  value: string | null
  onChange: (url: string | null) => void
}

export function CoverImageUpload({ value, onChange }: CoverImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(file: File) {
    setUploading(true)
    setError("")
    try {
      const supabase = createClient()
      const ext = file.name.split(".").pop() ?? "jpg"
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from("blog-covers")
        .upload(filename, file, { contentType: file.type })

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from("blog-covers")
        .getPublicUrl(filename)

      onChange(data.publicUrl)
    } catch {
      setError("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
  }

  function handleRemove() {
    onChange(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  if (value) {
    return (
      <div className="cover-upload-preview">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={value} alt="Cover preview" />
        <button type="button" onClick={handleRemove} className="cover-remove" title="Remove image">
          <X size={16} />
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="cover-upload" onClick={() => inputRef.current?.click()}>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleFileChange}
          hidden
        />
        {uploading ? (
          <p className="s-body-sm" style={{ color: "var(--ax-fg-3)" }}>Uploading...</p>
        ) : (
          <>
            <Upload size={32} style={{ margin: "0 auto", color: "var(--ax-slate-400)" }} />
            <p className="s-body-sm" style={{ color: "var(--ax-fg-3)", marginTop: 8 }}>
              Click to upload a cover image
            </p>
            <p style={{ color: "var(--ax-slate-400)", fontSize: 12 }}>
              JPEG, PNG, WebP or AVIF
            </p>
          </>
        )}
      </div>
      {error && <p className="s-body-sm" style={{ color: "var(--ax-error)", marginTop: 4 }}>{error}</p>}
    </>
  )
}
