import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostsFiles, PostFileType } from "@/lib/posts-util";
import { GetStaticPropsContext } from "next";

export default function PostDetailPage({ post }: { post: PostFileType }) {
  return <PostContent post={post} />;
}

export function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const postData = getPostData(params!.slug as string);
  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();
  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}
