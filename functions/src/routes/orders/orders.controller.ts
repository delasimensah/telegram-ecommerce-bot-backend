import { Request, Response } from "express";

export async function httpGetOrders(_: Request, res: Response) {
  try {
    const orders: string[] = [];

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: "an error" });
  }
}
