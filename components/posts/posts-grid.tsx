import { PostType } from "./post-item";
import PostItem from "./post-item";
import classes from "./posts-grid.module.css";

function PostsGrid(props: { posts: PostType[] }) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} {...post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
