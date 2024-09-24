import { fetchData } from '../networkLayer';

export const fetchProducts = async (
  categoryIds: number[],
  page: number,
  limit: number = 10,
  q: string = '',
) => {
  const params = {
    categories: categoryIds,
    page,
    num: limit,
    q,
  };
  return await fetchData('products', params);
};

export const fetchProductDetail = async (id: number) => {
  return await fetchData(`product/${id}`);
};

export const fetchAttributeDetail = async (
  productId: number,
  attributeId: number,
) => {
  return await fetchData(
    `product_attributes/${productId}?attributes=${attributeId}`,
  );
};
