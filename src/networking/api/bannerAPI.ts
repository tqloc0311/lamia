export const fetchBanners = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return Promise.resolve({ status: 1, data: [] });
};
