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
