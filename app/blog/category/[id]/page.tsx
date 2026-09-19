import { getPostsByCategory } from '@/app/actions/blog';
import Header from '@/components/header';
import Pagination from '@/components/pagination';
import PostCard from '@/components/post-card';
import { authSession } from '@/lib/auth.utils';

export default async function CategoryPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ page?: string }>;
  params: Promise<{ id: string }>;
}) {
  const session = await authSession();
  const { id } = await params;
  const searchArgs = await searchParams;

  const page = Number(searchArgs.page) || 1;
  const { posts, totalPage, currentPage } = await getPostsByCategory(id, page);

  const foundPost = posts.find((post) => post.categoryId === id);

  return (
    <>
      <Header about={foundPost?.category?.name} />
      <div className="flex h-full min-h-dvh flex-col justify-between gap-6">
        <div className="container mx-auto my-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
        {posts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            page={page}
            pageUrl={`/blog/category/${id}`}
          />
        )}
      </div>
    </>
  );
}
