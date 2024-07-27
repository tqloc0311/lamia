interface ICategory {
  id: number;
  name: string;
  parent_id: number;
  description: string | null;
  status: string;
  order: number;
  image: string;
  is_featured: number;
  is_rand: number;
  created_at: string;
  updated_at: string;
  products_count: number;
}

class Category implements ICategory {
  id: number;
  name: string;
  parent_id: number;
  description: string | null;
  status: string;
  order: number;
  image: string;
  is_featured: number;
  is_rand: number;
  created_at: string;
  updated_at: string;
  products_count: number;

  constructor(data: ICategory) {
    this.id = data.id;
    this.name = data.name;
    this.parent_id = data.parent_id;
    this.description = data.description;
    this.status = data.status;
    this.order = data.order;
    this.image = data.image;
    this.is_featured = data.is_featured;
    this.is_rand = data.is_rand;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.products_count = data.products_count;
  }
}

export default Category;
