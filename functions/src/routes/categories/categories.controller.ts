import { Request, Response } from "express";
import {
  getAllCategories,
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} from "@utils/db-queries/category-queries";
import { Category } from "@utils/types";

export const httpCreateCategory = async (req: Request, res: Response) => {
  const { name } = req.body as Category;

  try {
    await createCategory(name);

    res.status(200).json({ message: "category created successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const httpGetCategories = async (_: Request, res: Response) => {
  try {
    const categories = await getAllCategories();

    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: "an error occured" });
  }
};

export const httpGetCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await getCategory(id);

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: "an error occured" });
  }
};

export const httpUpdateCategory = async (req: Request, res: Response) => {
  const category = req.body;
  const { id } = req.params;

  const updatedCategory = {
    name: category.name,
    active: JSON.parse(category.active),
  };

  try {
    await updateCategory(id, updatedCategory);

    res.status(200).json({ message: "category successfully updated" });
  } catch (error) {
    res.status(400).json({ message: "an error occurred" });
  }
};

export const httpDeleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteCategory(id);

    res.status(200).json({ message: "category successfully deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
