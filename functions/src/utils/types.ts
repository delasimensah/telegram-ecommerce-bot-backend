export type User = {
  id: string | number;
  firstName: string | undefined;
  lastName: string | null;
  username: string | null;
  chatSession?: boolean;
  currency?: string;
  paymentMethod?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  number?: string;
  vendor?: boolean;
  createdAt?: Date;
  blocked?: boolean;
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
  createdAt?: Date;
};

export type Category = {
  id?: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
};

export type Order = {
  id: string | number;
  userId: string | number;
  username: string;
  contactNumber: string;
  location: {
    latitude: number;
    longitude: number;
  };
  paymentMethod: string;
  fulfilled: boolean;
  cancelled: boolean;
  products: CartProduct[];
  total: number;
  createdAt?: Date;
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
  createdAt?: Date;
};

// vendor ids
// 1439724996 - ??
