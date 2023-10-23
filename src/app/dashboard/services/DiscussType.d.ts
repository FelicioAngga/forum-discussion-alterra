export type DiscussionType = {
  user_uid: string;
  email: string | null;
  username: string | null;
  title: string;
  hashtag: Array<string>;
  image: File;
}