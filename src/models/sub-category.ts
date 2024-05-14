import { faker } from '@faker-js/faker';

interface SubCategory {
  id: number;
  name: string;
  imageUrl: string;
}

class SubCategory {
  id: number;
  name: string;
  imageUrl: string;

  constructor(id: number, name: string, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
  }

  static parseFromJSON(json: any): SubCategory {
    return new SubCategory(json.id, json.name, json.imageUrl);
  }
}

export const getMockSubCategories = () => {
  const mockSubCategories: any[] = Array.from(
    { length: 21 },
    () =>
      new SubCategory(
        faker.number.int(1000000),
        faker.commerce.productName(),
        faker.image.urlLoremFlickr({ category: 'fashion' }),
      ),
  );
  return mockSubCategories;
};

export default SubCategory;
