import React from 'react';
import { Box, Text } from '@lamia/utils/theme';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';
import { ActivityIndicator, Pressable, ViewStyle } from 'react-native';
import { moneyFormat } from '@lamia/utils/helpers';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationType } from '@lamia/navigation/types';
import { useState } from 'react';
import Popup from '../shared/popup';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import Product from '@lamia/models/product';
import { CartItem } from '@lamia/models/cart-item';
import { addToCart } from '@lamia/redux/actions/cart';
import ProductAttribute from '@lamia/models/product-attribute';
import { fetchAttributeDetail } from './actions';

interface ProductTileProps {
  style?: ViewStyle;
  product: Product;
  thumbnailRef?: any;
}

const ProductTile = (props: ProductTileProps) => {
  const navigation = useNavigation<AppNavigationType>();
  const dispatch = useAppDispatch();
  const [isSizePickerVisible, setIsSizePickerVisible] = useState(false);
  const { isFetchingAttributeDetail } = useAppSelector(state => state.products);
  const { currentUser } = useAppSelector(state => state.app);

  const showAddToCartPopup = () => {
    if (!props.product.id) {
      return;
    }

    if (!currentUser) {
      navigation.navigate('Login');
      return;
    }

    setIsSizePickerVisible(true);
  };

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
            {/* {randomNumber(40, 50) / 10} */}5
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center">
          {/* <Pressable>
            <Box
              aspectRatio={1}
              justifyContent="center"
              alignItems="center"
              height="100%">
              <CImage source={Images.heartOutline} size={12} />
            </Box>
          </Pressable>

          <Box width={4} /> */}

          <Pressable onPress={() => showAddToCartPopup()}>
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

  // const renderFlashSale = () => {
  //   return <Box></Box>;
  // };

  // const renderPromotion = () => {
  //   return <Box></Box>;
  // };

  // const renderDiscount = () => {
  //   return (
  //     <Box
  //       position="absolute"
  //       top={8}
  //       right={0}
  //       bg="yellow"
  //       px="1.5"
  //       py="0.5"
  //       borderTopLeftRadius="rounded16"
  //       borderBottomLeftRadius="rounded16">
  //       <Text color="red" fontWeight="500" fontSize={10}>
  //         -20%
  //       </Text>
  //     </Box>
  //   );
  // };

  // const renderBestSeller = () => {
  //   return <Box></Box>;
  // };

  const addToCartHandler = (attribute: ProductAttribute) => {
    if (!props.product.id) {
      return;
    }

    dispatch(
      fetchAttributeDetail({
        productId: props.product.id,
        attributeId: attribute.id,
        callback: attributeDetail => {
          if (attributeDetail) {
            setIsSizePickerVisible(false);
            const item: CartItem = {
              product: props.product,
              attribute,
              attributeDetail,
              quantity: 1,
            };

            dispatch(addToCart(item));
          }
        },
      }),
    );
  };

  if (!props.product) {
    return null;
  }

  return (
    <Box style={props.style}>
      <Popup
        visible={isSizePickerVisible}
        position="bottom"
        onTouchOutside={() => setIsSizePickerVisible(false)}>
        <Box bg="white" px="3" pb="4">
          {isFetchingAttributeDetail && <ActivityIndicator />}
          {!isFetchingAttributeDetail && (
            <Box>
              <Box gap="5">
                {(props.product.product_attributes || []).map(attribute => {
                  return (
                    <Pressable
                      key={attribute.id}
                      onPress={() => {
                        addToCartHandler(attribute);
                      }}>
                      <Box px="2">
                        <Text textAlign="center" fontSize={18} fontWeight="700">
                          {attribute.title}
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
          )}
        </Box>
      </Popup>
      <Pressable
        onPress={() => {
          navigation.navigate('ProductDetail', { productId: props.product.id });
        }}>
        <Box
          ref={props.thumbnailRef}
          aspectRatio={162.0 / 234.0}
          borderRadius="rounded"
          overflow="hidden">
          <CImage
            source={
              props.product?.images?.[0]
                ? { uri: props.product.images[0] }
                : Images.noImage
            }
            resizeMode="center"
          />
        </Box>
        <Box height={8} />
        {renderActions()}
        <Box height={4} />
        {/* <ProductColorPicker didSelect={() => {}} /> */}
        <Box height={40} my="2">
          <Text
            numberOfLines={2}
            fontWeight="400"
            fontSize={14}
            color="text"
            lineHeight={21}>
            {props.product?.name}
          </Text>
        </Box>
        <Box height={20} flexDirection="row">
          <Text fontWeight="700" fontSize={14} color="primary">
            {moneyFormat(props.product.front_sale_price)}
          </Text>
          <Box width={12} />
          {props.product.front_sale_price !== props.product.original_price && (
            <Text
              textDecorationStyle="solid"
              textDecorationLine="line-through"
              fontWeight="400"
              fontSize={14}
              color="gray6">
              {moneyFormat(props.product.original_price)}
            </Text>
          )}
        </Box>

        {/* {renderDiscount()} */}
      </Pressable>
    </Box>
  );
};

export default ProductTile;
