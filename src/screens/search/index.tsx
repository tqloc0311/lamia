import React, { useEffect, useRef } from 'react';
import { Box } from '@lamia/utils/theme';
import ProductList from '@lamia/components/products/product-list';
import CTextInput from '@lamia/components/shared/custom-text-input';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import { reset } from './store';
import { searchProducts } from './actions';
import useDebouncedState from '@lamia/hooks/use-debounced-state';
import ProductCollectionListSkeleton from '@lamia/components/products/product-list-skeleton';

const SearchScreen = () => {
  const dispatch = useAppDispatch();
  const { products, loading, totalProducts, hasMoreData, isFetchingMore } =
    useAppSelector(state => state.searchScreen);
  const page = useRef(1);
  const [searchText, debouncedSearchText, setSearchText] =
    useDebouncedState<string>('', 100);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  const refresh = () => {
    page.current = 1;
    dispatch(searchProducts({ query: debouncedSearchText, page: 1 }));
  };

  const fetchMore = () => {
    if (!hasMoreData || isFetchingMore) {
      return;
    }

    page.current = page.current + 1;
    dispatch(
      searchProducts({ query: debouncedSearchText, page: page.current }),
    );
  };

  return (
    <Box bg="white">
      <Box
        my="3"
        mx="3"
        p="2"
        borderRadius="rounded"
        borderWidth={1}
        borderColor="gray4">
        <CTextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Nhập tên / mã sản phẩm"
        />
      </Box>
      {!loading && (
        <ProductList
          data={products}
          numOfProducts={totalProducts}
          onRefresh={refresh}
          onEndReached={fetchMore}
          showFilter
        />
      )}
      {loading && <ProductCollectionListSkeleton numOfItems={8} />}
    </Box>
  );
};

export default SearchScreen;
