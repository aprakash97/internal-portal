import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { SidebarProvider } from '@/components/ui/sidebar';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { Toaster } from 'sonner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Link href="/">
        <Button variant="secondary">
          <HomeIcon />
          Home
        </Button>
      </Link>
      <div className="w-full p-6">{children}</div>
      <Toaster position="bottom-right" richColors />
    </SidebarProvider>
  );
}
