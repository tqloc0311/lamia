interface Category {
  id: number;
  title: string;
  isSaleOff: boolean;
}

class Category {
  id: number;
  title: string;
  isSaleOff: boolean;

  constructor(id: number, title: string, isSaleOff: boolean) {
    this.id = id;
    this.title = title;
    this.isSaleOff = isSaleOff;
  }

  static parseFromJSON(json: any): Category {
    return new Category(json.id, json.title, json.isSaleOff);
  }
}

export const mockData = [
  new Category(1, 'Sản phẩm', false),
  new Category(2, 'Đồng giá', false),
  new Category(3, 'Sale-off', true),
  new Category(4, 'Áo dài', false),
  new Category(5, 'Đầm', false),
  new Category(6, 'Quần chân váy', false),
  new Category(7, 'Vest nữ', false),
  new Category(8, 'Sơ mi nữ', false),
  new Category(9, 'Phụ kiện', false),
];

export default Category;
