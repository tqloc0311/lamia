import React from 'react';
import { Box, Text } from '@lamia/utils/theme';
import { Pressable, StyleSheet } from 'react-native';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';
import Category from '@lamia/models/category';
import { Colors } from '@lamia/utils/theme/colors';

interface ProductCollectionTileProps {
  category: Category;
  isSelected?: boolean;
  onPress?: (category: Category) => void;
}

const ProductCollectionTile = (props: ProductCollectionTileProps) => {
  return (
    <Pressable
      style={styles.pressable}
      onPress={() => props.onPress?.(props.category)}>
      <Box flex={1} p="1" alignItems="center">
        <Box
          mb="1"
          justifyContent="center"
          alignItems="center"
          width="100%"
          flex={1}>
          <CImage
            style={{
              ...(styles.image as any),
              ...{
                borderWidth: props.isSelected ? 2 : 1,
                borderColor: !props.isSelected ? Colors.gray6 : 'black',
              },
            }}
            source={
              props.category.image
                ? {
                    uri: props.category.image,
                  }
                : Images.discountTile
            }
            defaultSource={Images.headerLogo}
          />
        </Box>
        <Box height={16}>
          <Text
            fontSize={12}
            fontWeight="400"
            lineHeight={14}
            textAlign="center">
            {props.category.name}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default ProductCollectionTile;

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  image: {
    borderRadius: 200,
    aspectRatio: 1,
  },
});
