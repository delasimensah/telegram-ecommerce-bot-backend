import { db } from "@utils/fb-admin";
import { CartProduct } from "@utils/types";

// bot
export const addProductToCart = async (chatId: string, data: CartProduct) => {
  const ref = db.collection("users").doc(chatId).collection("cart");
  await ref.add(data);
};

export const getCartProducts = async (chatId: string) => {
  const ref = db.collection("users").doc(chatId).collection("cart");
  const snapshot = await ref.get();

  if (snapshot.empty) return [];

  const cartProducts = snapshot.docs.map((doc) => doc.data() as CartProduct);

  return cartProducts;
};

export const removeProductFromCart = async (chatId: string, id: string) => {
  const ref = db.collection("users").doc(chatId).collection("cart").doc(id);
  await ref.delete();
};
