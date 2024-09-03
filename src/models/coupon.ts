export interface IDiscount {
  id: number;
  title: string | null;
  code: string;
  start_date: string;
  end_date: string | null;
  quantity: number | null;
  total_used: number;
  value: number;
  type: string;
  can_use_with_promotion: number;
  discount_on: string | null;
  product_quantity: number;
  type_option: string;
  target: string;
  min_order_price: number | null;
  created_at: string;
  updated_at: string;
}

export interface IDiscountDetails {
  discount_amount: number;
  is_free_shipping: boolean;
  discount_type_option: string;
  discount: IDiscount;
}
