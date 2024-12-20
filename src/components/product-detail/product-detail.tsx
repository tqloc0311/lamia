import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Text } from '@lamia/utils/theme';
import { moneyFormat } from '@lamia/utils/helpers';
import CButton from '../shared/custom-button';
import SizePicker from './size-picker';
import AmountPicker from './amount-picker';
import HyperLink from '../shared/hyper-link';
import { Images } from '@lamia/utils/images';
import SegmentedControl from '../shared/segmented_control';
import ProductDetailCaption from './product-detail-caption';
import ProductCommentList from './product-comment-list';
import Product from '@lamia/models/product';
import ExpandableHtml from '../shared/expandable-html';
import Layout from '@lamia/constants/Layout';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import { CartItem } from '@lamia/models/cart-item';
import { addToCart } from '@lamia/redux/actions/cart';
import { fetchAttributeDetail } from '../products/actions';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationType } from '@lamia/navigation/types';
import CIcon from '../shared/custom-icon';
import { addFavorite, removeFavorite } from './actions';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = (props: ProductDetailProps) => {
  const navigation = useNavigation<AppNavigationType>();
  const dispatch = useAppDispatch();
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [isReturnPrivacyExpanded, setIsReturnPrivacyExpanded] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState(
    props.product.product_attributes?.find(item => !!item.is_default),
  );
  const [amount, setAmount] = useState(1);
  const { attributeDetails, isFetchingAttributeDetail } = useAppSelector(
    state => state.products,
  );
  const { favorites, loading } = useAppSelector(state => state.favorite);

  const { currentUser } = useAppSelector(state => state.app);

  const isFavorite = useMemo(
    () => !!favorites.find(item => item.product_id === props.product.id),
    [favorites, props.product],
  );

  const selectedAttributeDetail = useMemo(
    () => attributeDetails[`${props.product.id}_${selectedAttribute?.id}`],
    [attributeDetails, props.product, selectedAttribute],
  );

  const addToCartHandler = () => {
    if (!currentUser) {
      navigation.navigate('Login');
      return;
    }

    const productAttributes = props.product.product_attributes || [];

    if (
      !props.product.id ||
      (productAttributes.length > 0 && !selectedAttribute)
    ) {
      return;
    }

    const item: CartItem = {
      product: props.product,
      quantity: amount,
      attribute: selectedAttribute,
      attributeDetail: selectedAttributeDetail,
    };

    dispatch(addToCart(item));
  };

  const toggleFavorite = () => {
    if (!props.product.id) {
      return;
    }

    if (!currentUser) {
      navigation.navigate('Login');
      return;
    }

    if (isFavorite) {
      const existingItem = favorites.find(
        item => item.product_id === props.product.id,
      );

      if (!existingItem) {
        return;
      }
      dispatch(removeFavorite(existingItem.id));
    } else {
      dispatch(addFavorite(props.product.id));
    }
  };

  useEffect(() => {
    if (!props.product.id || !selectedAttribute) {
      return;
    }

    dispatch(
      fetchAttributeDetail({
        productId: props.product.id,
        attributeId: selectedAttribute.id,
      }),
    );
  }, [dispatch, props.product, selectedAttribute]);

  const renderProductPrice = useCallback(() => {
    let originalPriceText = moneyFormat(props.product.original_price);
    let salePriceText = moneyFormat(props.product.front_sale_price);

    if (props.product.id && selectedAttribute && selectedAttributeDetail) {
      originalPriceText = moneyFormat(selectedAttributeDetail.original_price);
      salePriceText = moneyFormat(selectedAttributeDetail.front_sale_price);
    }

    return (
      <Box flexDirection="row" alignItems="center">
        <Text fontWeight="700" fontSize={20} color="primary">
          {originalPriceText}
        </Text>
        {salePriceText !== originalPriceText && (
          <Text
            ml="2"
            textDecorationStyle="solid"
            textDecorationLine="line-through"
            fontWeight="400"
            fontSize={14}
            color="gray6">
            {salePriceText}
          </Text>
        )}
        {/* <Box bg="yellow" px="1" py="0.5" ml="2">
      <Text color="primary" fontWeight="500" fontSize={10}>
        -20%
      </Text>
    </Box> */}
      </Box>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAttributeDetail]);

  return (
    <Box py="2" px="3" mb="6">
      <Text lineHeight={21}>
        <Text fontSize={16} numberOfLines={2}>
          {props.product.name}
        </Text>
        <Text fontSize={14} color="gray6">
          {`   #${props.product.id}   `}
        </Text>
        <Text style={styles.inStockText} fontSize={14} color="green">
          {' Còn hàng '}
        </Text>
      </Text>

      <Box height={8} />

      <Box flexDirection="row">
        {renderProductPrice()}
        {isFetchingAttributeDetail && (
          <ActivityIndicator style={{ marginLeft: 8 }} />
        )}
      </Box>

      <Box height={8} />

      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        {/* <ProductColorPicker didSelect={() => {}} /> */}
        {!!props.product.product_attributes && (
          <SizePicker
            attributes={props.product.product_attributes}
            selected={selectedAttribute}
            onSelect={setSelectedAttribute}
          />
        )}
        <Box flexDirection="row" alignItems="center">
          <CButton
            isEnabled={
              (!isFetchingAttributeDetail && !!selectedAttributeDetail) ||
              !props.product.product_attributes ||
              props.product.product_attributes.length === 0
            }
            filled
            px="5"
            onPress={() => addToCartHandler()}>
            Mua ngay
          </CButton>
          <Pressable
            onPress={() => toggleFavorite()}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ opacity: loading ? 0.7 : 1 }}>
            <Box
              borderTopLeftRadius="rounded"
              borderBottomRightRadius="rounded"
              borderColor="primary"
              borderWidth={1}
              width={38}
              height={38}
              justifyContent="center"
              alignItems="center"
              marginLeft="2">
              <CIcon
                image={isFavorite ? Images.heartFilled : Images.heart}
                size={24}
                onPress={toggleFavorite}
                color="primary"
              />
            </Box>
          </Pressable>
        </Box>
      </Box>

      <Text>{`Tồn kho: ${props.product.quantity}`}</Text>

      <Box height={8} />

      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        height={30}>
        <HyperLink
          image={Images.ruler}
          title="Cách chọn size"
          url="https://lamia.com.vn/huong-dan-do-size"
        />

        <AmountPicker value={amount} maxValue={10} onPick={setAmount} />
      </Box>

      <Box height={8} />

      {/* <Box height={8} />

      <HyperLink
        image={Images.marker}
        title="Tìm sản phẩm tại showroom"
        url="https://google.com"
      /> */}

      <Box height={10} bg="gray9" my="6" />

      <SegmentedControl
        selectedIndex={selectedSegmentIndex}
        onSelect={setSelectedSegmentIndex}
        items={['CHÍNH SÁCH ĐỔI TRẢ', 'CHI TIẾT SẢN PHẨM']}
      />
      <Box height={16} />
      {selectedSegmentIndex === 0 && (
        <ExpandableHtml
          html={props.product.description || ''}
          minHeight={200}
          expanded={isReturnPrivacyExpanded}
          toggleExpanded={() => setIsReturnPrivacyExpanded(prev => !prev)}
          width={Layout.window.width - 24}
        />
      )}

      {/* <Box height={10} bg="gray9" my="6" /> */}

      {/* <Box>
        <Text textAlign="center" fontSize={20} fontWeight="700" mb="4">
          MUA CÙNG VỚI
        </Text>

        <ProductSlider
          data={Array.from({ length: 10 }, () => {
            {
            }
          })}
        />
      </Box> */}

      {selectedSegmentIndex === 0 && <Box height={10} bg="gray9" my="6" />}

      <ProductDetailCaption text="THÔNG TIN SẢN PHẨM" />

      <Box height={16} />

      {props.product.content && (
        <ExpandableHtml
          html={props.product.content || ''}
          minHeight={200}
          expanded={isContentExpanded}
          toggleExpanded={() => setIsContentExpanded(prev => !prev)}
          width={Layout.window.width - 24}
        />
      )}

      <Box height={10} bg="gray9" my="6" />

      <ProductDetailCaption text="ĐÁNH GIÁ KHÁCH HÀNG" />

      {/* <Box height={16} />

      <ProductRating /> */}

      <Box height={16} />

      {props.product.id && (
        <ProductCommentList productId={props.product.id} limit={5} />
      )}

      {/* <Box height={10} bg="gray9" my="6" />

      <Text fontSize={20} fontWeight="700" textAlign="center">
        SẢN PHẨM LIÊN QUAN
      </Text>

      <ProductSlider
        mt="4"
        data={Array.from({ length: 5 }, () => {
          {
          }
        })}
      />

      <Box height={10} bg="gray9" my="6" />

      <Text fontSize={20} fontWeight="700" textAlign="center">
        SẢN PHẨM ĐÃ XEM
      </Text>

      <ProductSlider
        mt="4"
        data={Array.from({ length: 5 }, () => {
          {
          }
        })}
      /> */}
    </Box>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  inStockText: {
    backgroundColor: '#f2fcf5',
    paddingLeft: 16,
  },
});
