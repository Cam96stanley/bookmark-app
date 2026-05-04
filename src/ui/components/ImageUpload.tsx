"use client";

import { ImageIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";

type ImageUploadProps = {
  defaultImage?: string;
  onChange?: (file: File) => void;
  id?: string;
};

export default function ImageUpload({
  id,
  defaultImage,
  onChange,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onChange?.(file);
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="flex items-center justify-center w-16 h-16 rounded-sm border bg-background hover:bg-muted transition-colors overflow-hidden cursor-pointer"
    >
      {preview ? (
        <Image
          src={preview}
          alt="favicon"
          width={64}
          height={64}
          className="object-cover"
        />
      ) : (
        <ImageIcon size={24} className="text-muted-foreground" />
      )}
      <input
        id={id}
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </button>
  );
}
