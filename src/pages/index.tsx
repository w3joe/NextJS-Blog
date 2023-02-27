import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Post } from "@/model/Post";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "@/components/BlogCard";


const graphcms = new GraphQLClient(process.env.CONTENT_API!);

const query = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      coverPhoto {
        url
      }
      author {
        name
        avatar {
          url
        }
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(query);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({ posts }: { posts: Array<Post> }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {posts.map((post: Post) => (
          <BlogCard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.datePublished}
            slug={post.slug}
          />
        ))}
      </main>
    </>
  );
}
