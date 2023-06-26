import { db } from "@utils/fb-admin";
import { User } from "@utils/types";
import { Timestamp } from "firebase-admin/firestore";

// api queries
export const getAllUsers = async () => {
  const ref = db.collection("users");
  const snapshot = await ref.orderBy("createdAt", "desc").get();

  if (snapshot.empty) return [];

  const users = snapshot.docs.map((doc) => {
    return {
      id: +doc.id,
      ...doc.data(),
    } as User;
  });

  return users;
};

// bot queries
export const createUser = async (user: User) => {
  const { id, firstName, lastName, username } = user;

  const ref = db.collection("users").doc(id as string);
  const doc = await ref.get();

  if (doc.exists) return;

  const userInfo = {
    firstName,
    lastName,
    username,
    chatSession: false,
    createdAt: Timestamp.fromDate(new Date()),
  };

  await ref.set(userInfo);
};
