import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Box, Text } from '@lamia/utils/theme';

interface ProductDetailCaptionProps {
  text: string;
}

const ProductDetailCaption = (props: ProductDetailCaptionProps) => {
  return (
    <Box flexDirection="row" borderBottomColor="gray6" borderBottomWidth={1}>
      <Box pb="4" borderBottomWidth={2} borderBottomColor="primary">
        <Text fontSize={14} fontWeight="700" color="primary">
          {props.text}
        </Text>
      </Box>
    </Box>
  );
};

export default ProductDetailCaption;

const styles = StyleSheet.create({});
