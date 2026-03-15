import { getAllPosts } from "@/app/blog/mdx";
import { PostCard } from "@/app/blog/page-client";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = await getAllPosts();
  const postsWithTag = posts.filter((post) => post.metadata.tags.includes(tag));

  return (
    <div className="flex flex-col gap-10">
      <div className="text-3xl text-center">
        {postsWithTag.length > 0 ? "Posts" : "No posts"} about {tag}
      </div>
      {postsWithTag.length > 0 && (
        <div className="flex flex-col gap-5">
          {postsWithTag.map((post) => (
            <PostCard key={post.metadata.title} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
