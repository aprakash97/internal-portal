import { getCategories } from '@/app/actions/categories';
import { getTags, getUniquePost } from '@/app/actions/posts';
import PostForm from '@/components/post-form';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getUniquePost(id);
  const categories = await getCategories();
  const tags = await getTags();

  const uniqueTags = Array.from(new Set(tags));
  const transform = uniqueTags.map((t) => ({
    value: t,
    label: t,
  }));

  return (
    <>
      <div className="flex flex-col p-8">
        <div className="flex w-full justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/posts">posts</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {id === 'new' ? 'New' : post.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex flex-col p-8">
        {post ? (
          <PostForm
            id={post.id}
            title={post.title}
            content={post.content}
            imageUrl={post.imageUrl}
            categoryId={post.categoryId!}
            tags={post.tags.map((tag) => ({ label: tag, value: tag }))}
            status={post.status}
            slug={post.slug}
            categories={categories}
          />
        ) : (
          <PostForm
            title={''}
            content={''}
            imageUrl={''}
            categoryId={''}
            tags={transform}
            status={''}
            slug={''}
            categories={categories}
          />
        )}
      </div>
    </>
  );
}
