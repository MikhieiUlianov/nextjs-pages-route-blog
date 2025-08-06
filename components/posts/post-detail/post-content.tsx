import ReactMarkdown from "react-markdown";

import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import { PostFileType } from "@/lib/posts-util";
import Image from "next/image";

const DUMMY_POST = {
  slug: "getting-started-with-nextjs",
  title: "Getting Started with NextJS",
  image: "getting-started-nextjs.png",
  date: "2022-02-10",
  content: "# This is a first post",
};

export default function PostContent({ post }: { post: PostFileType }) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    /*  img(image){
    return (
      <Image
        src={`/images/posts/getting-started-with-nextjs/${image.src}`}
        alt={image.alt}
        width={600}
        height={300}
      />
    );
  }, */
    p(paragraph: any) {
      const { node } = paragraph;

      if (node.children[0]?.tagName === "img") {
        const imageNode = node.children[0];

        const src = imageNode.properties?.src;
        const alt = imageNode.properties?.alt || "";

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${src}`}
              alt={alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}
