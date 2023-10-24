import FirebaseConfiguration from "@/firebase/FirebaseConfiguration";
import { getDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export default async function(docId: string) {
  const discussionDoc = await getDoc(doc(FirebaseConfiguration.db, `discussions/${docId}`));
  const { email, user_image, comments_count, username, user_id, title, hashtag, image, created_at }: any = discussionDoc.data();
  let imageUrl = "";

  const imagesRef = ref(FirebaseConfiguration.storage, image);
  try {
    imageUrl = await getDownloadURL(imagesRef);
  } catch (e: any) {
    console.log(e.message);
  }
  
  return {
    docId: discussionDoc.id,
    comments_count,
    email,
    user_image,
    username,
    user_id,
    title,
    hashtag,
    image: imageUrl,
    created_at: created_at.toDate().toString(),
  }
}