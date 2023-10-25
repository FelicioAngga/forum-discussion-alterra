import FirebaseConfiguration from "@/firebase/FirebaseConfiguration";
import { FieldValue, doc, runTransaction } from "firebase/firestore";

export default async function (docId: string, like: boolean) {
  if (!FirebaseConfiguration.auth.currentUser) return;
  const user_id = FirebaseConfiguration.auth.currentUser.uid
  await runTransaction(FirebaseConfiguration.db, async (transaction) => {
    const docRef = doc(FirebaseConfiguration.db, "discussions", docId);
    const docSnap = await transaction.get(docRef);
    const { likes }: any = docSnap.data();
    if (like) {
      const likeData = likes ? [...likes, user_id] : [user_id];
      transaction.update(docRef, {
        likes: likeData,
      });
    } else {
      const newLike = likes.filter((item: any) => item !== user_id);
      transaction.update(docRef, {
        likes: newLike,
      });
    }
  });
}