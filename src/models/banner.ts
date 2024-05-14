import { faker } from '@faker-js/faker';

interface Banner {
  id: number;
  imageUrl: string;
}

class Banner {
  id: number;
  imageUrl: string;

  constructor(id: number, imageUrl: string) {
    this.id = id;
    this.imageUrl = imageUrl;
  }

  static parseFromJSON(json: any): Banner {
    return new Banner(json.id, json.imageUrl);
  }
}

export default Banner;

export const getMockBanners = (): Banner[] => {
  const mockBanners: any[] = Array.from(
    { length: 5 },
    () =>
      new Banner(
        faker.number.int(1000000),
        faker.image.urlLoremFlickr({ category: 'fashion' }),
      ),
  );
  return mockBanners;
};
