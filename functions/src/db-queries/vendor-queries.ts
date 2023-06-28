import { db } from "@utils/fb-admin";
import { Vendor } from "@utils/types";

export const getVendorInfo = async () => {
  const ref = db.collection("vendors");
  const snapshot = await ref.get();

  if (snapshot.empty) return;

  const vendorInfo = {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  } as Vendor;

  return vendorInfo;
};
