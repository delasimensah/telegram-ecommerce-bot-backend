import { db } from "@utils/fb-admin";
import { Vendor } from "@utils/types";

export const getVendorInfo = async (id: string) => {
  const ref = db.collection("vendors").doc(id);
  const snapshot = await ref.get();

  if (!snapshot.exists) return;

  const vendorInfo = {
    id: snapshot.id,
    ...snapshot.data(),
  } as Vendor;

  return vendorInfo;
};

export const updateVendor = async (id: string, details: Vendor) => {
  const ref = db.collection("vendors").doc(id);
  await ref.update({
    ...details,
  });
};
