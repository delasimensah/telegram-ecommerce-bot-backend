// import * as fs from "fs";

// import { categories } from "@utils/helpers/categories-array";

// import {
//   FirestoreEvent,
//   QueryDocumentSnapshot,
// } from "firebase-functions/v2/firestore";

// const updateCategoriesTSFile = (data: string[]) => {
//   const filePath = "./src/utils/helpers/categories-array.ts";
//   const content = "export const categories: string[] =" + JSON.stringify(data);

//   fs.writeFile(filePath, content, (error) => {
//     if (error) {
//       console.error("Error writing to ts file:", error);
//     } else {
//       console.log("File written to ts successfully.");
//       console.log({ categories });
//     }
//   });
// };

// const updateCategoriesJSFile = (data: string[]) => {
//   console.log("category update js function", data);
//   const filePath = "./lib/utils/helpers/categories-array.js";
//   const content = "export const categories =" + JSON.stringify(data);

//   fs.writeFile(filePath, content, (error) => {
//     if (error) {
//       console.error("Error writing to js file:", error);
//     } else {
//       console.log("File written to js file successfully.");
//       console.log({ categories });
//     }
//   });
// };

// export const addToCategoriesArray = (
//   event: FirestoreEvent<
//     QueryDocumentSnapshot | undefined,
//     { categoryId: string }
//   >
// ) => {
//   const snapshot = event.data;

//   if (!snapshot?.exists) {
//     console.log("No data associated with the event");
//     return;
//   }

//   const data = snapshot?.data();
//   const name = data?.name;
//   console.log("category add function", { categoryName: name });

//   categories.push(name);
//   updateCategoriesJSFile(categories);
//   updateCategoriesTSFile(categories);
// };

// export const removeFromCategoriesArray = (
//   event: FirestoreEvent<
//     QueryDocumentSnapshot | undefined,
//     { categoryId: string }
//   >
// ) => {
//   const snapshot = event.data;
//   const name = snapshot?.data().name;
//   console.log("category remove function", { categoryName: name });

//   const updatedCategories = categories.filter((category) => category !== name);

//   updateCategoriesJSFile(updatedCategories);
//   updateCategoriesTSFile(updatedCategories);
// };
