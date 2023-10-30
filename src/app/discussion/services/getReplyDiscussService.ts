import FirebaseConfiguration from "@/firebase/FirebaseConfiguration";
import { query, collection, getDocs, where, orderBy } from "firebase/firestore";

export type ReceivedReplyDiscussType = {
  discussion_id: string;
  reply_text: string;
  user_id: string;
  user_image: string;
  username: string;
  created_at: string;
}

export default async function(id: string) {
  const discussionReplyQuery = query(collection(FirebaseConfiguration.db, "discussion_reply"), where("discussion_id", "==", id));
  const replyDocs = await getDocs(discussionReplyQuery);
  const replyArray: Array<ReceivedReplyDiscussType> = [];

  for (const doc of replyDocs.docs) {
    const tempData = doc.data();

    replyArray.push({
      username: tempData["username"],
      user_id: tempData["user_id"],
      reply_text: tempData["reply_text"],
      discussion_id: tempData["discussion_id"],
      user_image: tempData["user_image"],
      created_at: tempData["created_at"].toDate().toString(),
    })
  }

  return replyArray.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}
