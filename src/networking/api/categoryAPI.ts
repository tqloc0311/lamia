import { fetchData } from '../networkLayer';

export const fetchCategories = async () => {
  return fetchData('category');
};

export const fetchChildrenCategories = async (parentId: number) => {
  return fetchData('category', { parent_id: parentId });
};

export const fetchPromotionCategories = async () => {
  return fetchData('category', { parent_id: 19 });
};
