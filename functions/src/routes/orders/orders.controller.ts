import { Request, Response } from "express";
import { getAllOrders, getOrder, updateOrder } from "@db-queries/order-queries";

export async function httpGetOrders(_: Request, res: Response) {
  try {
    const orders = await getAllOrders();

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "an error" });
  }
}

export async function httpGetOrder(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const order = await getOrder(id);

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "an error occured" });
  }
}

export async function httpUpdateOrder(req: Request, res: Response) {
  const order = req.body;
  const { id } = req.params;

  const updatedOrder = {
    ...order,
  };

  try {
    await updateOrder(id, updatedOrder);

    res.status(200).json({ message: "order successfully updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "an error occurred" });
  }
}
