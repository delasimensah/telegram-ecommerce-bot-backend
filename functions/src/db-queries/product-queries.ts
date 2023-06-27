import { db } from "@utils/fb-admin";
import { Product } from "@utils/types";
import { productEmoji } from "@utils/helpers/emojis";

// api queries
export const createProduct = async (product: Product) => {
  const ref = db.collection("products");
  const snapshot = await ref.where("name", "==", product.name).get();

  // check if product exists
  if (!snapshot.empty && snapshot.docs[0].data().name === product.name) return;

  await ref.add({
    ...product,
    inStock: true,
    createdAt: new Date().toISOString(),
  });
};

export const getProduct = async (id: string) => {
  const ref = db.collection("products").doc(id);
  const snapshot = await ref.get();

  if (!snapshot.exists) return;

  const product = snapshot.data() as Product;

  return product;
};

export const getAllProducts = async () => {
  const ref = db.collection("products");
  const snapshot = await ref.orderBy("createdAt", "desc").get();

  if (snapshot.empty) return [];

  const products = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Product;
  });

  return products;
};

export const updateProduct = async (id: string, product: Product) => {
  const ref = db.collection("products").doc(id);
  await ref.update(product);
};

export const deleteProduct = async (id: string) => {
  const ref = db.collection("products").doc(id);
  await ref.delete();
};

// bot queries
export const getAllProductNames = async () => {
  const ref = db.collection("products");
  const snapshot = await ref.orderBy("createdAt", "desc").get();

  if (snapshot.empty) return [];

  const products = snapshot.docs.map((doc) => doc.id);

  return products;
};

export const getCategoryProductNames = async (category: string) => {
  const ref = db
    .collection("products")
    .where("category", "==", category)
    .where("inStock", "==", true);
  const snapshot = await ref.orderBy("createdAt", "desc").get();

  if (snapshot.empty) return [];

  const products = snapshot.docs.map(
    (doc) => `${productEmoji} ${doc.data().name}`
  );

  return products;
};

export const getProductInfo = async (product: string) => {
  const ref = db.collection("products");
  const snapshot = await ref.where("name", "==", product).get();

  if (snapshot.empty) return;

  const productInfo = snapshot.docs[0].data() as Product;

  return productInfo;
};
