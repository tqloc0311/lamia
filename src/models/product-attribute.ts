interface ProductAttribute {
  id: number;
  attribute_set_id: number;
  title: string;
  slug: string;
  product_id: number;
  order: number;
  color: string;
  image: string;
  is_default: number;
}

export interface AttributeDetail {
  id: number;
  name: string;
  image: string | null;
  images: string[];
  sku: string;
  quantity: number;
  description: string | null;
  content: string | null;
  original_price: number;
  front_sale_price: number;
  product_labels: any[];
  product_attributes: any[];
}

export interface OrderProduct {
  product_id: number;
  attribute_id: number;
  qty: number;
  price: number;
}

export default ProductAttribute;
