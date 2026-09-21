'use client';

import { OurFileRouter } from '@/app/api/uploadthing/core';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { UploadDropzone } from '@/lib/uploadThing';
import { Button } from './ui/button';

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

  const handleRemove = () => {
    setValue(null);
    setShowDropzone(true);
    onChange?.(null);
  };

  useEffect(() => {
    setValue(defaultUrl ?? null);
    setShowDropzone(!defaultUrl);
  }, [defaultUrl]);

  if (!showDropzone && value) {
    return (
      <div className="relative">
        <div className="relative min-h-[50] w-full min-w-[150] overflow-hidden rounded-xl shadow-lg">
          <Image src={value} className="object-cover" fill alt="thumbnail" />
        </div>
        <div className="mt-3 flex gap-2">
          <Button
            type="button"
            variant="destructive"
            className="absolute top-0 right-0 m-2 cursor-pointer rounded-full bg-white p-2 opacity-60 shadow-2xl hover:opacity-100"
            onClick={handleRemove}
          >
            <X />
          </Button>
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
