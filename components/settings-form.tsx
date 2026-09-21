'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { Button } from './ui/button';
import ImageUploader from './image-uploader';
import Image from 'next/image';
import { toast } from 'sonner';
import { Spinner } from './ui/spinner';
import { updateUserProfile } from '@/app/actions/user';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, 'Name max length should be above 2').optional(),
  email: z.string(),
  imageUrl: z.string().optional(),
});

interface SettingProps {
  name: string;
  email: string;
  imageUrl: string;
}

export type SettingsFormValues = z.infer<typeof formSchema>;

export default function SettingsForm({ name, email, imageUrl }: SettingProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      name,
      email,
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setIsLoading(true);
      await updateUserProfile(data);
      toast.success('Post updated successfully');
      form.reset();
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Post Failed');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center py-4">
      <h1>Account Settings</h1>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[2fr_1fr] items-start gap-6 pt-6">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    disabled
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Firstname Lastname"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Image
              src={imageUrl || '/defaultUser.svg'}
              alt={`${name} profile image`}
              width={100}
              height={100}
            />

            <Controller
              name="imageUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-imageURL">
                    Display Image
                  </FieldLabel>
                  <ImageUploader
                    endpoint="imageUploader"
                    defaultUrl={field.value || null}
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
          </FieldGroup>
        </div>

        <div className="mt-6 flex justify-start">
          <Button
            type="submit"
            form="form-rhf-demo"
            className="m-2 max-w-40 cursor-pointer p-6"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {isLoading ?? <Spinner className="size-6" />} Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
