export type Post = {
  title: string;
  id: string;
  slug: string;
  coverPhoto: Asset;
  content: RichText;
  author: Author;
  datePublished: Date;
}

export type RichText = {
    html: string;
 }

 export type Asset = {
    url: string;
 }

 export type Author = {
    name: string;
    avatar: Asset;
 }