import NavBar from '@/components/nav-bar';
import { authSession } from '@/lib/auth.utils';

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authSession();
  return (
    <>
      <div className="relative w-full">
        <NavBar
          name={session?.user.name}
          userImage={session?.user.image || ''}
        />
        {children}
      </div>
    </>
  );
}
