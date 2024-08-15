import { FlatList, ListRenderItemInfo } from 'react-native';
import React from 'react';
import { Box } from '@lamia/utils/theme';
import ProductCommentListItem from './product-comment-list-item';
import CButton from '../shared/custom-button';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationType } from '@lamia/navigation/types';
import { useEffectOnce } from 'react-use';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import { fetchReviews } from '@lamia/redux/actions/review';
import Review from '@lamia/models/review';

interface ProductCommentListProps {
  productId: number;
  limit?: number;
  hideButtons?: boolean;
}
const ProductCommentList: React.FC<ProductCommentListProps> = (
  props: ProductCommentListProps,
) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AppNavigationType>();
  const currentUser = useAppSelector(state => state.app.currentUser);

  useEffectOnce(() => {
    dispatch(fetchReviews(props.productId));
  });

  const { reviews } = useAppSelector(state => state.reviews);

  const renderItem = (itemData: ListRenderItemInfo<Review>) => {
    return <ProductCommentListItem review={itemData.item} />;
  };

  const renderSeparator = () => {
    return <Box height={1} bg="gray8" my="2" />;
  };

  return (
    <Box>
      <FlatList
        data={props.limit ? reviews.slice(0, props.limit) : reviews}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />

      {!props.hideButtons && (
        <Box mt="6" flexDirection="row" justifyContent="center">
          <CButton
            outline
            flex={1}
            justifyContent="center"
            onPress={() => navigation.navigate('ProductComments')}>
            Xem tất cả
          </CButton>
          <Box width={12} />
          <CButton
            filled
            flex={1}
            justifyContent="center"
            onPress={() =>
              currentUser
                ? navigation.navigate('ProductCommentSubmit', {
                    productId: props.productId,
                  })
                : navigation.navigate('Login')
            }>
            Viết đánh giá
          </CButton>
        </Box>
      )}
    </Box>
  );
};

export default ProductCommentList;
