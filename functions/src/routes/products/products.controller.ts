import { Request, Response } from "express";
import { Product } from "@utils/types";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "@utils/db-queries/product-queries";

export const httpCreateProduct = async (req: Request, res: Response) => {
  const product = req.body as Product;

  try {
    await createProduct(product);

    res.status(200).json({ message: "product created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "an error occurred" });
  }
};

export const httpGetProducts = async (_: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "an error occurred" });
  }
};

export const httpGetProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await getProduct(id);

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "an error occured" });
  }
};

export const httpUpdateProduct = async (req: Request, res: Response) => {
  const product = req.body;
  const { id } = req.params;

  try {
    const updatedProduct = {
      ...product,
      inStock: JSON.parse(product.inStock),
    };

    await updateProduct(id, updatedProduct);

    res.status(200).json({ message: "product successfully updated" });
  } catch (error) {
    res.status(400).json({ message: "an error occurred" });
  }
};

export const httpDeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteProduct(id);

    res.status(200).json({ message: "product successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: "an error occurred" });
  }
};
