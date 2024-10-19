import Product from './product';

export interface IFavorite {
  id: number;
  user_id: number;
  product_id: number;
  product: Product;
}
