export type User = {
  id: string | number;
  firstName: string | undefined;
  lastName: string | null;
  username: string | null;
  chatSession?: boolean;
  paymentMethod?: string;
  deliveryLocation?: Location;
  contactNumber?: string;
  createdAt?: string;
  blocked?: boolean;
  totalOrders?: number;
  amountSpent?: number;
};

export type Price = {
  quantity: number;
  amount: number;
};

export type Product = {
  id?: string;
  name: string;
  description: string;
  photo: string;
  inStock: boolean;
  category: string;
  prices: Price[];
  createdAt?: string;
};

export type Category = {
  id?: string;
  name: string;
  active?: boolean;
  createdAt?: string;
};

export type Order = {
  id?: string | number;
  orderNumber?: number;
  userId: string | number;
  username: string;
  contactNumber: string;
  deliveryLocation: Location;
  paymentMethod: string;
  products: CartProduct[];
  total: number;
  createdAt?: string;
  paymentStatus: "paid" | "unpaid";
  orderStatus: "pending" | "confirmed" | "cancelled";
};

export type CartProduct = {
  id?: string;
  name: string;
  quantity: number;
  amount: number;
};

export type Vendor = {
  id: string | number;
  currency: string;
  chatSession: boolean;
  mobileMoneyNumber?: string;
  mobileMoneyName?: string;
  createdAt?: string;
};

export type Location = {
  latitude: number;
  longitude: number;
};
