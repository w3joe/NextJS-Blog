import styles from "../../styles/Slug.module.css";
import { Post } from "@/model/Post";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "@/components/BlogCard";

const graphcms = new GraphQLClient(process.env.CONTENT_API!);

const query = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        url
      }
    }
  }
`;

const sluglist = gql`
  {
    posts {
      slug
    }
  }
`;
export async function getStaticPaths() {
  const { posts } = await graphcms.request(sluglist);
  return {
    paths: posts.map((post: Post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const data = await graphcms.request(query, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

export default function BlogPost({ post }: { post: Post }) {
  return (
    <main className={styles.blog}>
      <img src={post.coverPhoto.url} className={styles.cover} alt="" />
      <div className={styles.title}>
        <img src={post.author.avatar.url} alt="" />
        <div className={styles.authtext}>
          <h6>By {post.author.name}</h6>
          <h6 className={styles.date}>{post.datePublished.toString()}</h6>
        </div>
      </div>
      <h2>{post.title}</h2>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
    </main>
  );
}
