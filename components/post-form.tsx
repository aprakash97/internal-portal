'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z, { object } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from '@base-ui/react';
import { Link } from 'lucide-react';
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field';
import { Spinner } from './ui/spinner';
import { Button } from './ui/button';
import ImageUploader from './image-uploader';
import Select from 'react-select/creatable';
import { useState } from 'react';
import {
  Select as SingleSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Textarea } from './ui/textarea';
import { generateSlug } from '@/lib/utils';

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(5, 'Title is required'),
  content: z.string().trim().min(10, 'Title is required'),
  imageUrl: z.string('Image URL is required'),
  categoryId: z.string(),
  tags: z.array(object({ label: z.string(), value: z.string() })),
  status: z.string(),
  categories: z.array(object({ id: z.string(), name: z.string() })).optional(),
  slug: z.string().trim().min(5, 'Title is required'),
});

export type FormValues = z.infer<typeof formSchema>;

export default function PostForm({
  id,
  title,
  content,
  imageUrl,
  categoryId,
  status,
  slug,
  tags,
  categories,
}: FormValues) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      id,
      title,
      content,
      imageUrl,
      categoryId,
      categories,
      status,
      slug,
      tags,
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      if (id) {
        // TODO:
      }
      //   await createPost(data);
      toast.success('Post Successfully');
        router.refresh();
        router.push('/posts');
    } catch (err) {
      console.error(err);
      toast.error('Post Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-[2fr_1fr] items-start gap-6">
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Post Title"
                  autoComplete="off"
                  className="border border-gray-300"
                  onBlur={(e) => {
                    field.onBlur();

                    if (!form.getValues('slug')) {
                      form.setValue('slug', generateSlug(e.target.value), {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-slug">Slug</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-slug"
                  aria-invalid={fieldState.invalid}
                  placeholder="Slug"
                  autoComplete="off"
                  className="border border-gray-300"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="imageUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-imageURL">
                  Image URL
                </FieldLabel>
                <ImageUploader
                  endpoint="imageUploader"
                  defaultUrl={field.value}
                  onChange={(url) => {
                    field.onChange(url);
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-content">Content</FieldLabel>
                <Textarea
                  {...field}
                  id="form-rhf-demo-content"
                  aria-invalid={fieldState.invalid}
                  placeholder="Content"
                  autoComplete="off"
                  className="border border-gray-300"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="tags"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-tags">Tags</FieldLabel>
                <Select
                  isMulti
                  isClearable
                  {...field}
                  onCreateOption={(value) => {
                    const newOption = {
                      label: value,
                      value: value.toLocaleLowerCase(),
                    };
                    field.onChange([...field.value, newOption]);
                  }}
                  components={{ IndicatorsContainer: () => null }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Extra Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Controller
                name="categoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-categoryId">
                      Category
                    </FieldLabel>
                    <SingleSelect
                      {...field}
                      key={field.name}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        className="w-full max-w-48"
                        key={field.name}
                      >
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SingleSelect>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-status">
                      Status
                    </FieldLabel>
                    <SingleSelect
                      {...field}
                      key={field.name}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Status Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Publish', 'Draft'].map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SingleSelect>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-start">
        <Button
          type="submit"
          form="form-rhf-demo"
          className="max-w-40 cursor-pointer p-6 m-2"
          //   disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {isLoading ?? <Spinner className="size-6" />} Save Changes
        </Button>
      </div>
    </form>
  );
}
