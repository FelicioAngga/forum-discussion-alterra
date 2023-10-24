import FirebaseConfiguration from "@/firebase/FirebaseConfiguration";
import { DiscussTypeRedux } from "@/redux/slices/discussSlice";
import { collection, getDocs, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export default async function() {
  const discussionsQuery = query(collection(FirebaseConfiguration.db, "discussions"));
  const discussionsDocs = await getDocs(discussionsQuery);
  const discussionArray: Array<DiscussTypeRedux> = [];

  for (const doc of discussionsDocs.docs) {
    const tempData = doc.data();
    let imageUrl = "";
    if (tempData.image) {
      const imagesRef = ref(FirebaseConfiguration.storage, tempData.image);
      try {
        imageUrl = await getDownloadURL(imagesRef);
      } catch (e: any) {
        console.log(e.message);
      }
    }

    discussionArray.push({
      docId: doc.id,
      email: tempData["email"],
      user_image: tempData["user_image"],
      username: tempData["username"],
      user_uid: tempData["user_uid"],
      title: tempData["title"],
      hashtag: tempData["hashtag"],
      image: imageUrl,
      created_at: tempData["created_at"].toDate().toString(),
    });
  }
  return discussionArray;
}