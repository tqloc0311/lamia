import { fetchData, postData } from '../networkLayer';

export const fetchReviews = async (productId: number) => {
  const params = {
    id: productId,
  };
  return await fetchData('get_comment', params);
};

export const postReview = async (
  productId: number,
  rating: number,
  message: string,
) => {
  const params = {
    product_id: productId,
    comment: message,
    star: rating,
  };
  return await postData('create_comment', params);
};
