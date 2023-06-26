import { Request, Response } from "express";
import { User } from "@utils/types";

import { getAllUsers } from "@utils/db-queries/user-queries";

export async function httpGetUsers(_: Request, res: Response) {
  try {
    const users: User[] = await getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "an error" });
  }
}
