import { db } from "@utils/fb-admin";
import { Order } from "@utils/types";

export const getAllOrders = async () => {
  const ref = db.collection("orders");
  const snapshot = await ref.orderBy("createdAt", "desc").get();

  if (snapshot.empty) return [];

  const orders = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Order;
  });

  return orders;
};

export const getConfirmedOrders = async (id: string) => {
  const ref = db.collection("orders");
  const snapshot = await ref
    .where("userId", "==", id)
    .where("paymentStatus", "==", "paid")
    .where("orderStatus", "==", "confirmed")
    .orderBy("createdAt", "desc")
    .get();

  if (snapshot.empty) return [];

  const orders = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Order;
  });

  return orders;
};

export const createOrder = async (orderInfo: Order) => {
  const ref = db.collection("orders");

  const numOfDocs = await ref.get();
  const orderNumber = 1000 + numOfDocs.docs.length;

  const snapshot = await ref.add({
    ...orderInfo,
    orderNumber,
    products: [...orderInfo.products],
    createdAt: new Date().toISOString(),
    paymentStatus: "unpaid",
    orderStatus: "pending",
  });

  return { orderID: snapshot.id, orderNumber };
};

export const getOrder = async (id: string) => {
  const ref = db.collection("orders").doc(id);
  const snapshot = await ref.get();

  if (!snapshot.exists) return;

  const order = { id: snapshot.id, ...snapshot.data() } as Order;

  return order;
};

export const updateOrder = async (
  id: string,
  order: {
    orderStatus: "paid" | "unpaid";
    paymentStatus: "pending" | "confirmed" | "cancelled";
  }
) => {
  const ref = db.collection("orders").doc(id);
  await ref.update({
    ...order,
  });
};
