import { CartProduct } from "@utils/types";

export const calculateTotal = (items: CartProduct[]) => {
  const total = items.reduce((acc, { amount }) => {
    return acc + amount;
  }, 0);

  return total;
};
