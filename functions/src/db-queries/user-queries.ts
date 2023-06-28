import { db } from "@utils/fb-admin";
import { User, Location } from "@utils/types";
import { FieldValue } from "firebase-admin/firestore";
import { getConfirmedOrders } from "./order-queries";

// api queries
export const getAllUsers = async () => {
  const ref = db.collection("users");
  const snapshot = await ref.orderBy("createdAt", "desc").get();

  if (snapshot.empty) return [];

  const users = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const orders = await getConfirmedOrders(doc.id);

      const totalOrders = orders.length;
      const amountSpent = orders.reduce((acc, { total }) => {
        return acc + total;
      }, 0);

      return {
        id: +doc.id,
        totalOrders,
        amountSpent,
        ...doc.data(),
      } as User;
    })
  );

  return users;
};

export const updateUser = async (id: string, blocked: { blocked: boolean }) => {
  const ref = await db.collection("users").doc(id);
  await ref.update(blocked);
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
    createdAt: new Date().toISOString(),
    blocked: false,
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
