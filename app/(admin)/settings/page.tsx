import { getCurrentUserDetails } from '@/app/actions/user';
import SettingsForm from '@/components/settings-form';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { authSession } from '@/lib/auth.utils';

export default async function SettingsPage() {
  const session = await authSession();
  const user = await getCurrentUserDetails(session?.user.id || '1');
  return (
    <div className="flex flex-col p-8">
      <div className="flex w-full justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <SettingsForm
        email={user?.email || ''}
        name={user?.name || ''}
        imageUrl={user?.image || ''}
      />
    </div>
  );
}
