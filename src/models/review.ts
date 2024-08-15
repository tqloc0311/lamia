import User from './user';

interface Review {
  id: number;
  customer_id: number;
  product_id: number;
  star: number;
  comment: string;
  status: string;
  created_at: string | null;
  updated_at: string | null;
  images: string[] | null;
  username: string | null;
  phone: string | null;
  name_guest: string | null;
  order_created_at: string | null;
  user: User;
}

export default Review;
