import { db } from "@utils/fb-admin";
import { Order } from "@utils/types";

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

export const createOrder = async () => {
  // const { id, firstName, lastName, username } = user;
  // const ref = db.collection("users").doc(`${id}`);
  // const doc = await ref.get();
  // // TODO:add created at field
  // if (!doc.exists) {
  //   const userInfo = {
  //     id,
  //     firstName,
  //     lastName,
  //     username,
  //     chatSession: false,
  //   };
  //   await ref.set(userInfo);
  // }
};
