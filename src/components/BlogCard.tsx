import { Asset, Author } from "@/model/Post";
import Link from "next/link";
import React from "react";
import styles from "../styles/BlogCard.module.css";

export default function BlogCard({
  title,
  author,
  coverPhoto,
  datePublished,
  slug,
}: {
  title: string;
  author: Author;
  coverPhoto: Asset;
  datePublished: Date;
  slug: string;
}) {
  return (
    <div className={styles.card}>
      <Link href={"/posts/" + slug}>
        <div className={styles.imgContainer}>
          <img src={coverPhoto.url} alt="" />
        </div>
        <div className={styles.text}>
          <h2>{title}</h2>
          <div className={styles.details}>
            <div className={styles.author}>
              <img src={author.avatar.url} alt="" />
              <h3>{author.name}</h3>
            </div>
            <div className={styles.date}>
              <h3>{datePublished.toString()}</h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
