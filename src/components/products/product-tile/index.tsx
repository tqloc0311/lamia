import React from 'react';
import { Box, Text } from '@lamia/utils/theme';
import CImage from '../../shared/custom-image';
import { Images } from '@lamia/utils/images';
import { Pressable, ViewStyle } from 'react-native';
import { moneyFormat } from '@lamia/utils/helpers';
import ProductColorPicker from '../product-color-picker';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationType } from '@lamia/navigation/types';
import { useState } from 'react';
import Popup from '../../shared/popup';
import { useAppDispatch } from '@lamia/hooks/context';
import { addToCart } from './actions';

interface ProductTileProps {
  styles?: ViewStyle;
  thumbnailRef?: any;
}

const ProductTile = (props: ProductTileProps) => {
  const navigation = useNavigation<AppNavigationType>();
  const dispatch = useAppDispatch();
  const [isSizePickerVisible, setIsSizePickerVisible] = useState(false);

  const renderActions = () => {
    return (
      <Box
        height={24}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box flexDirection="row" alignItems="center">
          <CImage source={Images.star} size={10} />
          <Box width={4} />
          <Text fontSize={10} color="primary">
            4.4
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center">
          <Pressable>
            <Box
              aspectRatio={1}
              justifyContent="center"
              alignItems="center"
              height="100%">
              <CImage source={Images.heartOutline} size={12} />
            </Box>
          </Pressable>

          <Box width={4} />

          <Pressable onPress={() => setIsSizePickerVisible(true)}>
            <Box
              aspectRatio={1}
              bg="primary"
              height="100%"
              justifyContent="center"
              alignItems="center"
              borderTopLeftRadius="rounded4"
              borderBottomRightRadius="rounded4">
              <CImage source={Images.cart} color="white" size={12} />
            </Box>
          </Pressable>
        </Box>
      </Box>
    );
  };

  const renderFlashSale = () => {
    return <Box></Box>;
  };

  const renderPromotion = () => {
    return <Box></Box>;
  };

  const renderDiscount = () => {
    return (
      <Box
        position="absolute"
        top={8}
        right={0}
        bg="yellow"
        px="1.5"
        py="0.5"
        borderTopLeftRadius="rounded16"
        borderBottomLeftRadius="rounded16">
        <Text color="red" fontWeight="500" fontSize={10}>
          -20%
        </Text>
      </Box>
    );
  };

  const renderBestSeller = () => {
    return <Box></Box>;
  };

  const addToCartHandler = (_: string) => {
    dispatch(
      addToCart({ id: 1, name: 'Product 1', price: 1234567, quantity: 1 }),
    );
  };

  return (
    <Box style={props.styles}>
      <Popup visible={isSizePickerVisible} position="bottom">
        <Box bg="white" px="3" pb="4">
          <Box gap="5">
            {['S', 'M', 'L', 'XL'].map(size => {
              return (
                <Pressable
                  key={size}
                  onPress={() => {
                    setIsSizePickerVisible(false);
                    addToCartHandler(size);
                  }}>
                  <Box px="2">
                    <Text textAlign="center" fontSize={18} fontWeight="700">
                      {size}
                    </Text>
                  </Box>
                </Pressable>
              );
            })}
          </Box>
          <Box height={20} />
          <Text fontWeight="700" textAlign="center">
            Bạn chọn cỡ gì?
          </Text>
        </Box>
      </Popup>
      <Pressable onPress={() => navigation.navigate('ProductDetail')}>
        <Box ref={props.thumbnailRef} aspectRatio={162.0 / 234.0}>
          <CImage source={Images.test.girl1} />
        </Box>
        <Box height={8} />
        {renderActions()}
        <Box height={8} />
        <ProductColorPicker />
        <Box height={42} my="2">
          <Text
            numberOfLines={2}
            fontWeight="400"
            fontSize={14}
            color="text">{`Tên sản phẩm`}</Text>
        </Box>
        <Box height={20} flexDirection="row">
          <Text fontWeight="700" fontSize={14} color="primary">
            {moneyFormat(1234567)}
          </Text>
          <Box width={12} />
          <Text
            textDecorationStyle="solid"
            textDecorationLine="line-through"
            fontWeight="400"
            fontSize={14}
            color="gray6">
            {moneyFormat(1234567)}
          </Text>
        </Box>

        {renderDiscount()}
      </Pressable>
    </Box>
  );
};

export default ProductTile;
