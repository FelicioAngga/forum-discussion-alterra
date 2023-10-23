import FirebaseConfiguration from "@/firebase/FirebaseConfiguration";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { DiscussionType } from "./DiscussType";
import { ref, uploadBytes } from "firebase/storage";
import { nanoid } from "@reduxjs/toolkit";

export default async function(data: DiscussionType) {
  const currentUserUID = FirebaseConfiguration.auth.currentUser?.uid;

  const lastDot = data.image.name.lastIndexOf(".");
  const ext = data.image.name.substring(lastDot + 1);
  const tokenPaymentConfirmationRef = ref(
    FirebaseConfiguration.storage,
    `discussions/${currentUserUID}/${nanoid(20)}.${ext}`
  );
  const snapshot = await uploadBytes(tokenPaymentConfirmationRef, data.image);

  await addDoc(collection(FirebaseConfiguration.db, "discussions"), {
    ...data,
    image: snapshot.metadata.fullPath,
    user_image: FirebaseConfiguration.auth.currentUser?.photoURL,
    created_at: serverTimestamp(),
  });
}