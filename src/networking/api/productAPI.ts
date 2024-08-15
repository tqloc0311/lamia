import { fetchData } from '../networkLayer';

export const fetchProducts = async (
  categoryIds: number[],
  page: number,
  limit: number = 10,
) => {
  const params = {
    categories: categoryIds,
    page,
    num: limit,
  };
  return await fetchData('products', params);
};

export const fetchProductDetail = async (id: number) => {
  return await fetchData(`product/${id}`);
};
