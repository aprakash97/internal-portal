'use client';

import { OurFileRouter } from '@/app/api/uploadthing/core';
import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { UploadDropzone } from '@/lib/uploadThing';

type ImageUploaderProps = {
  defaultUrl: string | null;
  onChange?: (url: string | null) => void;
  endpoint: keyof OurFileRouter;
};

export default function ImageUploader({
  defaultUrl,
  onChange,
  endpoint,
}: ImageUploaderProps) {
  const [value, setValue] = useState<string | null>(defaultUrl ?? null);
  const [showDropzone, setShowDropzone] = useState<boolean>(!defaultUrl);

  const handleSet = (url: string | null) => {
    setValue(url);
    onChange?.(url);
  };

  if (!showDropzone && value) {
    return (
      <div className="relative">
        <div className="relative w-full min-w-[150] min-h-[50] shadow-lg overflow-hidden rounded-xl">
          <Image src={value} className="object-cover" fill alt="thumbnail" />
        </div>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className="absolute rounded-full right-0 top-0 bg-white opacity-60 hover:opacity-100 shadow-2xl p-2 m-2 cursor-pointer"
          >
            <X />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <UploadDropzone
        endpoint={endpoint}
        content={{
          label: value
            ? 'Drop or click to replace the image'
            : 'Drop or click to upload an image',
          allowedContent: 'PNG, JPGm JPEG . upto 4MB',
        }}
        appearance={{
          button: 'rounded-lg',
          container: 'rounded-xl border',
        }}
        onClientUploadComplete={(res) => {
          const url = res?.[0].ufsUrl;

          if (url) {
            handleSet(url);
            setShowDropzone(false);
          }
          toast('Upload Completed');
        }}
        onUploadError={(error: Error) => {
          toast(`ERROR! ${error.message}`);
        }}
        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log('Uploading: ', name);
        }}
        onDrop={(acceptedFiles) => {
          // Do something with the accepted files
          console.log('Accepted files: ', acceptedFiles);
        }}
      />
    </div>
  );
}
