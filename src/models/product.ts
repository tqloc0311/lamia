interface Slugable {
  id?: number;
  key?: string;
  reference_id?: number;
  reference_type?: string;
  prefix?: string;
  created_at?: string;
  updated_at?: string;
}

interface Variation {
  id?: number;
  product_id?: number;
  configurable_product_id?: number;
  is_default?: number;
}

interface ProductLabelPivot {
  product_id?: number;
  product_label_id?: number;
}

interface ProductLabel {
  id?: number;
  name?: string;
  color?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  pivot?: ProductLabelPivot;
}

interface AttributeSwatch {
  id?: number;
  attribute_set_id?: number;
  title?: string;
  slug?: string;
  color?: string;
  image?: string;
  is_default?: number;
  order?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
  product_id?: number;
  configurable_product_id?: number;
  attribute_id?: number;
  variation_id?: number;
  display_layout?: string;
  is_searchable?: number;
  is_comparable?: number;
  is_use_in_product_listing?: number;
  use_image_from_product_variation?: number;
  attribute_title?: string;
}

interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  content?: string;
  status?: string;
  images?: string[];
  sku?: string;
  order?: number;
  quantity?: number;
  allow_checkout_when_out_of_stock?: number;
  with_storehouse_management?: number;
  is_featured?: number;
  brand_id?: number;
  is_variation?: number;
  sale_type?: number;
  price?: number;
  sale_price?: number;
  start_date?: string | null;
  end_date?: string | null;
  length?: number;
  wide?: number;
  height?: number;
  weight?: number;
  tax_id?: number | null;
  views?: number;
  created_at?: string;
  updated_at?: string;
  stock_status?: string;
  created_by_id?: number;
  created_by_type?: string;
  image?: string;
  is_notcate?: number;
  final_price?: number;
  reviews_count?: number;
  reviews_avg?: number;
  original_price?: number;
  front_sale_price?: number;
  slugable?: Slugable;
  variations?: Variation[];
  product_labels?: ProductLabel[];
  variation_attribute_swatches_for_product_list?: AttributeSwatch[];
  product_collections?: any[]; // Adjust type as per actual structure
}

class Product implements IProduct {
  id?: number;
  name?: string;
  description?: string;
  content?: string;
  status?: string;
  images?: string[];
  sku?: string;
  order?: number;
  quantity?: number;
  allow_checkout_when_out_of_stock?: number;
  with_storehouse_management?: number;
  is_featured?: number;
  brand_id?: number;
  is_variation?: number;
  sale_type?: number;
  price?: number;
  sale_price?: number;
  start_date?: string | null;
  end_date?: string | null;
  length?: number;
  wide?: number;
  height?: number;
  weight?: number;
  tax_id?: number | null;
  views?: number;
  created_at?: string;
  updated_at?: string;
  stock_status?: string;
  created_by_id?: number;
  created_by_type?: string;
  image?: string;
  is_notcate?: number;
  final_price?: number;
  reviews_count?: number;
  reviews_avg?: number;
  original_price?: number;
  front_sale_price?: number;
  slugable?: Slugable;
  variations?: Variation[];
  product_labels?: ProductLabel[];
  variation_attribute_swatches_for_product_list?: AttributeSwatch[];
  product_collections?: any[];
}

export type OptionalProduct = Product | undefined;

export default Product;
