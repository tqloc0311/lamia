export interface IShippingOption {
  id: string;
  name: string;
  price: number;
  default: number;
}

export interface IOrder {
  id: number;
  user_id: number;
  shipping_method: string;
  status: string;
  amount: string;
  description: string | null;
  coupon_code: string | null;
  sub_total: string;
  is_confirmed: number;
  is_finished: number;
  payment_id: string | null;
  products: IOrderProduct[];
}

export interface IOrderProduct {
  image: string;
  name: string;
  sku: string;
  price: string;
  qty: number;
  variation_attributes: string;
}
