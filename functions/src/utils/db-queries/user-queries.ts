import { db } from "@utils/fb-admin";
import { User, Location } from "@utils/types";
import { Timestamp, FieldValue } from "firebase-admin/firestore";

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

export const getUserInfo = async (id: string) => {
  const ref = db.collection("users").doc(id);
  const snapshot = await ref.get();

  if (!snapshot.exists) return;

  const userInfo = { id: snapshot.id, ...snapshot.data() } as User;

  return userInfo;
};

export const updateContactNumber = async (
  id: string,
  contactNumber: string
) => {
  const ref = db.collection("users").doc(id);
  await ref.update({
    contactNumber,
  });
};

export const updateDeliveryLocation = async (
  id: string,
  location: Location
) => {
  const ref = db.collection("users").doc(id);
  await ref.update({
    deliveryLocation: location,
  });
};

export const updatePaymentMethod = async (
  id: string,
  paymentMethod: string
) => {
  const ref = db.collection("users").doc(id);
  await ref.update({
    paymentMethod,
  });
};

export const removeDeliveryInfo = async (id: string) => {
  const ref = db.collection("users").doc(id);

  await ref.update({
    contactNumber: FieldValue.delete(),
    deliveryLocation: FieldValue.delete(),
    paymentMethod: FieldValue.delete(),
  });
};
