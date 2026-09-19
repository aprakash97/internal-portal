import NavBar from '@/components/nav-bar';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative w-full">
        <NavBar />
        {children}
      </div>
    </>
  );
}
