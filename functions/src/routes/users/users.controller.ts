import { Request, Response } from "express";
import { User } from "@utils/types";

import { getAllUsers, updateUser } from "@db-queries/user-queries";

export async function httpGetUsers(_: Request, res: Response) {
  try {
    const users: User[] = await getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "an error occurred" });
  }
}

export const httpUpdateUser = async (req: Request, res: Response) => {
  const user = req.body;
  const { id } = req.params;

  const updatedUser = {
    blocked: JSON.parse(user.blocked),
  };

  try {
    await updateUser(id, updatedUser);

    res.status(200).json({ message: "user successfully updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "an error occurred" });
  }
};
