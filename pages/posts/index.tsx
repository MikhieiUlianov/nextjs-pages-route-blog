import AllPosts from "@/components/posts/all-posts";
import { getFeaturedPosts } from "@/lib/posts-util";
import { PostFileType } from "@/lib/posts-util";

export default function AllPostsPage({ posts }: { posts: PostFileType[] }) {
  return <AllPosts posts={posts} />;
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}
