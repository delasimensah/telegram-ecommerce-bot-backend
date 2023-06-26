// import * as fs from "fs";

// import { products } from "@utils/helpers/products-array";

// import {
//   FirestoreEvent,
//   QueryDocumentSnapshot,
// } from "firebase-functions/v2/firestore";

// const updateProductsTSFile = (data: string[]) => {
//   const filePath = "./src/utils/helpers/products-array.ts";
//   const content = "export const products: string[] =" + JSON.stringify(data);

//   fs.writeFile(filePath, content, (error) => {
//     if (error) {
//       console.error("Error writing to ts file:", error);
//     } else {
//       console.log("File written to ts successfully.");
//       console.log({ products });
//     }
//   });
// };

// const updateProductsJSFile = (data: string[]) => {
//   console.log("product update js function", data);
//   const filePath = "./lib/utils/helpers/products-array.js";
//   const content = "export const products =" + JSON.stringify(data);

//   fs.writeFile(filePath, content, (error) => {
//     if (error) {
//       console.error("Error writing to js file:", error);
//     } else {
//       console.log("File written to js file successfully.");
//       console.log({ products });
//     }
//   });
// };

// export const addToProductsArray = (
//   event: FirestoreEvent<
//     QueryDocumentSnapshot | undefined,
//     { productId: string }
//   >
// ) => {
//   const snapshot = event.data;

//   if (!snapshot?.exists) {
//     console.log("No data associated with the event");
//     return;
//   }

//   const data = snapshot?.data();
//   const name = data?.name;

//   console.log("product add function", { productName: name });

//   products.push(name);

//   updateProductsJSFile(products);
//   updateProductsTSFile(products);
// };

// export const removeFromProductsArray = (
//   event: FirestoreEvent<
//     QueryDocumentSnapshot | undefined,
//     { productId: string }
//   >
// ) => {
//   const snapshot = event.data;
//   const data = snapshot?.data();
//   const name = data?.name;
//   console.log("product remove function", { productName: name });

//   const updatedCategories = products.filter((product) => product !== name);

//   updateProductsJSFile(updatedCategories);
//   updateProductsTSFile(updatedCategories);
// };
