import { db } from "@utils/fb-admin";
import { Category } from "@utils/types";
import { categoryEmoji } from "@utils/helpers/emojis";

// api queries
export const createCategory = async (category: string) => {
  const ref = db.collection("categories");
  const snapshot = await ref.where("name", "==", category).get();

  // check if category exists
  if (!snapshot.empty && snapshot.docs[0].data().name === category) return;

  await ref.add({
    name: category,
    active: true,
    createdAt: new Date().toISOString(),
  });
};

export const getCategory = async (id: string) => {
  const ref = db.collection("categories").doc(id);
  const snapshot = await ref.get();

  if (!snapshot.exists) return;

  const category = snapshot.data() as Category;

  return category;
};

export const getAllCategories = async () => {
  const ref = db.collection("categories");
  const snapshot = await ref.orderBy("createdAt", "desc").get();

  if (snapshot.empty) return [];

  const categories = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Category;
  });

  return categories;
};

export const updateCategory = async (id: string, category: Category) => {
  const ref = db.collection("categories").doc(id);
  await ref.update(category);
};

export const deleteCategory = async (id: string) => {
  const ref = db.collection("categories").doc(id);
  await ref.delete();
};

// bot queries
export const getActiveCategoryNames = async () => {
  const ref = db.collection("categories").where("active", "==", true);
  const snapshot = await ref.orderBy("createdAt", "desc").get();

  if (snapshot.empty) return [];

  const categories = snapshot.docs.map(
    (doc) => `${categoryEmoji} ${doc.data().name}`
  );

  return categories;
};

export const getCategoryInfo = async (categoryName: string) => {
  const ref = db.collection("categories").where("name", "==", categoryName);
  const snapshot = await ref.get();

  if (snapshot.empty) return;

  const category = snapshot.docs[0].data() as Category;

  return category;
};
