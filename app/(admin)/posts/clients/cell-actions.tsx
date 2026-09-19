'use client';

import { deletePost } from '@/app/actions/posts';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { Copy, Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CellActions({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const onCopy = () => {
    navigator.clipboard.writeText(id);
    toast.success(`Post copied to clipboard`);
  };

  const onRemovePost = async () => {
    try {
      setIsLoading(true);
      await deletePost(id);
      toast.success(`Post deleted successfully`);
    } catch (err: any) {
      throw new Error(`Something went wrong ${err?.message}`);
    } finally {
      router.refresh();
      setIsLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex justify-end gap-6">
        <div
          className="cursor-pointer"
          title="Copy Category Id"
          onClick={onCopy}
        >
          <Copy />
        </div>

        <div
          className="cursor-pointer"
          title="Edit"
          onClick={() => {
            router.push(`/posts/${id}`);
          }}
        >
          <Edit />
        </div>

        <div
          className="cursor-pointer"
          title="Delete"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Trash className="text-red-500" />
        </div>
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent
          className="flex flex-col gap-6 sm:max-w-106.25"
          aria-describedby="category"
          aria-description="delete category"
        >
          <DialogHeader className="gap-6">
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription className="flex flex-col">
              <span className="text-shadow-md">
                Are you sure you want to delete this post ?
              </span>
              <span className="text-shadow-md">
                This action cannot be undone
              </span>
            </DialogDescription>
          </DialogHeader>
          <Button
            variant="destructive"
            onClick={onRemovePost}
            className="max-w-40 cursor-pointer self-end"
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="size-6" /> : 'Delete'}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
