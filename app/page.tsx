import PostCard from '@/components/post-card';
import { getPosts } from './actions/posts';
import Header from '@/components/header';
import NavBar from '@/components/nav-bar';
import Pagination from '@/components/pagination';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) | 1;
  const { posts, totalPage, currentPage } = await getPosts(page);

  return (
    <>
      <NavBar />
      <Header />
      <div className="flex flex-col justify-center gap-6">
        <div className="container mx-auto grid grid-cols-1 gap-6 p-4 py-6 md:grid-cols-4">
          {posts.map((post) => (
            // TODO : FIX Post Nulll TS
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </div>
      {posts?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPage}
          page={page}
        />
      )}
    </>
  );
}
