import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

type PostMetaData = {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  isFeatured: boolean;
};

export type PostFileType = PostMetaData & {
  slug: string;
  content: string;
};
function getPostData(fileName: string): PostFileType {
  const filePath = path.join(postsDirectory, fileName);
  //readFileSync will block for loop, until we parse that data
  const fileContent = fs.readFileSync(filePath, "utf-8");
  //returns an object with metadata (data) and a content (content).
  //  Content : The actual content, the markup text as a string
  const { data, content } = matter(fileContent);
  //removes the file extension
  const postSlug = fileName.replace(/\.md$/, "");

  const postData = {
    slug: postSlug,
    ...(data as PostMetaData),
    content,
  };

  return postData;
}

export function getAllPosts() {
  //return an array of all file names
  const postFiles = fs.readdirSync(postsDirectory);
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((p) => p.isFeatured);
  return featuredPosts;
}
