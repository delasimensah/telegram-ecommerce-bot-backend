import { Request, Response } from "express";
import { getAllOrders } from "@db-queries/order-queries";

export async function httpGetOrders(_: Request, res: Response) {
  try {
    const orders = await getAllOrders();

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: "an error" });
  }
}
