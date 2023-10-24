export type DiscussionType = {
  user_id: string;
  email: string | null;
  username: string | null;
  title: string;
  hashtag: Array<string>;
  image: File;
}