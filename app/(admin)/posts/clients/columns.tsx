'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Category, Post } from '@/lib/generated/prisma/client';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import CellActions from './cell-actions';
import Image from 'next/image';

type PostWithCategory = Post & { category: Category | null };

export const columns: ColumnDef<PostWithCategory>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        indeterminate={table.getIsSomePageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <div className="relative h-10">
          <Image
            src={
              row.original.imageUrl !== ''
                ? row.original.imageUrl
                : '/defaultImage.svg'
            }
            // src={'images.jpg'}
            alt={row.original.title}
            fill
            className="rounded-sm"
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.original.title}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return row.getValue('status');
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      return row.original.category?.name;
    },
  },
  {
    accessorKey: 'views',
    header: 'Views',
    cell: ({ row }) => {
      return row.getValue('views');
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <CellActions id={row.original.id} />;
    },
  },
];
