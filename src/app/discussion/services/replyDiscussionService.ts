import FirebaseConfiguration from "@/firebase/FirebaseConfiguration";
import { doc, increment, runTransaction, serverTimestamp } from "firebase/firestore";
import { ReplyDiscussType } from "./ReplyDiscussType";
import { v4 as uuidv4 } from 'uuid';

export default async function(data: ReplyDiscussType) {
  await runTransaction(FirebaseConfiguration.db, async (transaction) => {
    transaction.set(doc(FirebaseConfiguration.db, "discussion_reply", uuidv4()), {
      ...data,
      created_at: serverTimestamp(),
    });
    
    transaction.update(doc(FirebaseConfiguration.db, "discussions", data.discussion_id), {
      comments_count: increment(1),
    });
  });
}