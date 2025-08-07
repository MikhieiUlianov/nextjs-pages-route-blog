import ReactMarkdown from "react-markdown";
import type { Element } from "hast";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/esm/styles/prism/atom-dark"; // либо /cjs
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";

import Image from "next/image";
import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import type { PostFileType } from "@/lib/posts-util";
import type { Components } from "react-markdown";

// ✅ Регистрируем только нужные языки:
SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

export default function PostContent({ post }: { post: PostFileType }) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers: Components = {
    p({ node, children }) {
      if (
        node &&
        node.children &&
        node.children[0]?.type === "element" &&
        (node.children[0] as Element).tagName === "img"
      ) {
        const image = node.children[0] as Element;
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={String(image.properties.alt ?? "")}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{children}</p>;
    },

    code({ className, children }) {
      const language = className?.split("-")[1] || "text";
      return (
        <SyntaxHighlighter style={atomDark} language={language}>
          {String(children).trim()}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}
