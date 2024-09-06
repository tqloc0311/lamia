import { ActivityIndicator, StyleSheet } from 'react-native';
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
import ProductAttribute from '@lamia/models/product-attribute';
import { fetchAttributeDetail } from '../products/actions';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationType } from '@lamia/navigation/types';

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
  const { currentUser } = useAppSelector(state => state.app);

  const selectedAttributeDetail = useMemo(
    () => attributeDetails[`${props.product.id}_${selectedAttribute?.id}`],
    [attributeDetails, props.product, selectedAttribute],
  );

  const addToCartHandler = (attribute?: ProductAttribute) => {
    if (!currentUser) {
      navigation.navigate('Login');
      return;
    }

    if (!props.product.id || !selectedAttribute || !attribute) {
      return;
    }

    if (selectedAttributeDetail) {
      const item: CartItem = {
        product: props.product,
        quantity: amount,
        attribute,
        attributeDetail: selectedAttributeDetail,
      };

      dispatch(addToCart(item));
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
        <CButton
          isEnabled={!isFetchingAttributeDetail && !!selectedAttributeDetail}
          filled
          px="5"
          onPress={() => addToCartHandler(selectedAttribute)}>
          Mua ngay
        </CButton>
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
