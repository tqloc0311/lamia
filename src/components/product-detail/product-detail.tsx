import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Box, Text } from '@lamia/utils/theme';
import { moneyFormat } from '@lamia/utils/helpers';
import CButton from '../shared/custom-button';
import SizePicker from './size-picker';
import AmountPicker from './amount-picker';
import HyperLink from '../shared/hyper-link';
import { Images } from '@lamia/utils/images';
import { dummySizeArray, Size } from '@lamia/utils/types';
import SegmentedControl from '../shared/segmented_control';
import ProductDetailCaption from './product-detail-caption';
import ProductCommentList from './product-comment-list';
import Product from '@lamia/models/product';
import ExpandableHtml from '../shared/expandable-html';
import Layout from '@lamia/constants/Layout';
import { useAppDispatch } from '@lamia/hooks/context';
import { CartItem } from '@lamia/models/cart-item';
import { addToCart } from '@lamia/redux/actions/cart';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = (props: ProductDetailProps) => {
  const dispatch = useAppDispatch();
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [isReturnPrivacyExpanded, setIsReturnPrivacyExpanded] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<Size>(dummySizeArray[0]);

  const addToCartHandler = (size: Size) => {
    const item: CartItem = {
      product: props.product,
      quantity: 1,
      size,
    };

    dispatch(addToCart(item));
  };

  return (
    <Box py="2" px="3" mb="6">
      <Text>
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

      <Box flexDirection="row" alignItems="center">
        <Text fontWeight="700" fontSize={20} color="primary">
          {moneyFormat(props.product.front_sale_price)}
        </Text>
        {props.product.front_sale_price !== props.product.original_price && (
          <Text
            ml="2"
            textDecorationStyle="solid"
            textDecorationLine="line-through"
            fontWeight="400"
            fontSize={14}
            color="gray6">
            {moneyFormat(props.product.original_price)}
          </Text>
        )}
        {/* <Box bg="yellow" px="1" py="0.5" ml="2">
          <Text color="primary" fontWeight="500" fontSize={10}>
            -20%
          </Text>
        </Box> */}
      </Box>

      <Box height={8} />

      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        {/* <ProductColorPicker didSelect={() => {}} /> */}
        <SizePicker
          sizes={dummySizeArray}
          selectedId={selectedSize.id}
          onSelect={setSelectedSize}
        />
        <CButton filled px="5" onPress={() => addToCartHandler(selectedSize)}>
          Mua ngay
        </CButton>
      </Box>

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

        <AmountPicker
          initialValue={1}
          maxValue={10}
          onPick={value => {
            console.log(value);
          }}
        />
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
