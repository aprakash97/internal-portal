'use client';

import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Category } from '@/lib/generated/prisma/client';
import z from 'zod';
import { Controller, FormState, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategories } from '@/hooks/use-category';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createCategory, updateCategory } from '@/app/actions/categories';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Spinner } from '@/components/ui/spinner';
import { useEffect } from 'react';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Name is required' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CategoriesClient({
  categories,
}: {
  categories: Category[];
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onBlur',
  });

  const { open, setOpen, setCategory, category } = useCategories();
  const router = useRouter();

  useEffect(() => {
    if (category) {
      form.setValue('name', category.name);
    }
  }, [category]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (category?.id) {
        await updateCategory({ id: category.id, name: data.name });
        toast.success('New category updated successfully!');
      } else {
        await createCategory(data.name);
        toast.success('New category created successfully!');
      }

      router.refresh();
      form.reset();
      setCategory({ id: '', name: '' });
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="category-form">
          <DialogContent className="sm:max-w-108.75">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="category-form-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="category-form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Name"
                    autoComplete="off"
                    className="border border-gray-300"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                form="category-form"
                className="cursor-pointer"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                {form.formState.isSubmitting ? (
                  <Spinner className="size-6" />
                ) : (
                  'Save Changes'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      <div className="flex flex-col p-8">
        <div className="flex w-full justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Categories</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Button className="cursor-pointer" onClick={() => setOpen(true)}>
            Create new category
          </Button>
        </div>
      </div>
      <div className="flex flex-col p-8">
        <DataTable data={categories} columns={columns} />
      </div>
    </>
  );
}
