import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import React from 'react';
import { Box } from '@lamia/utils/theme';
import ProductCommentListItem from './product-comment-list-item';
import CButton from '../shared/custom-button';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationType } from '@lamia/navigation/types';

const ProductCommentList = () => {
  const navigation = useNavigation<AppNavigationType>();

  const data = Array.from({ length: 5 }).map((_, index) => index + 1);
  const renderItem = (data: ListRenderItemInfo<any>) => {
    return <ProductCommentListItem />;
  };

  const renderSeparator = () => {
    return <Box height={1} bg="gray8" my="2" />;
  };

  return (
    <Box>
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />

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
          onPress={() => navigation.navigate('ProductCommentSubmit')}>
          Viết đánh giá
        </CButton>
      </Box>
    </Box>
  );
};

export default ProductCommentList;

const styles = StyleSheet.create({});
