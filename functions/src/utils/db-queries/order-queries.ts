import { db } from "@utils/fb-admin";
import { Order } from "@utils/types";
import { Timestamp } from "firebase-admin/firestore";

export const getAllOrders = async () => {
  const ref = db.collection("orders");
  const snapshot = await ref.get();

  if (snapshot.empty) return [];

  const orders = snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
    } as Order;
  });

  return orders;
};

export const createOrder = async (orderInfo: Order) => {
  const ref = db.collection("orders");

  const snapshot = await ref.add({
    ...orderInfo,
    products: [...orderInfo.products],
    createdAt: Timestamp.fromDate(new Date()),
    cancelled: false,
    fulfilled: false,
  });

  return snapshot.id;
};
