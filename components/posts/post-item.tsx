import Link from "next/link";
import classes from "./post-item.module.css";
import Image from "next/image";

export type PostType = {
  slug: string;
  title: string;
  image: string;
  excerpt: string;
  date: string;
};

export default function PostItem({
  title,
  image,
  slug,
  date,
  excerpt,
}: PostType) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const imagePath = `/images/postps${slug}/${image}`;
  return (
    <li className={classes.post}>
      <Link href={"/"}>
        <div className={classes.image}>
          <Image src={imagePath} width={300} height={200} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
