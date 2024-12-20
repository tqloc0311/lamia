import Product from './product';
import ProductAttribute, { AttributeDetail } from './product-attribute';

export interface CartItem {
  product: Product;
  attribute?: ProductAttribute;
  attributeDetail?: AttributeDetail;
  quantity: number;
}
