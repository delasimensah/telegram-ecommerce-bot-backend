import { Request, Response } from "express";
import { getVendorInfo, updateVendor } from "@db-queries/vendor-queries";

export async function httpGetVendor(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const vendor = await getVendorInfo(id);

    res.status(200).json(vendor);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "an error occured" });
  }
}

export const httpUpdateVendor = async (req: Request, res: Response) => {
  const vendor = req.body;
  const { id } = req.params;

  const updatedVendor = {
    ...vendor,
    active: JSON.parse(vendor.active),
  };

  try {
    await updateVendor(id, updatedVendor);

    res.status(200).json({ message: "details successfully updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "an error occurred" });
  }
};
