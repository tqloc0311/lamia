import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Box, Text } from '@lamia/utils/theme';
import { moneyFormat } from '@lamia/utils/helpers';
import ProductColorPicker from '../products/product-color-picker';
import CButton from '../shared/custom-button';
import SizePicker from './size-picker';
import AmountPicker from './amount-picker';
import HyperLink from '../shared/hyper-link';
import { Images } from '@lamia/utils/images';
import { Size, dummySizeArray } from '@lamia/utils/types';
import SegmentedControl from '../shared/segmented_control';
import ExpandableText from '../shared/expandable-text';
import { faker } from '@faker-js/faker';
import ProductSlider from './product-slider';
import ProductDetailCaption from './product-detail-caption';
import ProductRating from './product-rating';
import ProductCommentList from './product-comment-list';

const ProductDetail = () => {
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [isReturnPrivacyExpanded, setIsReturnPrivacyExpanded] = useState(false);

  return (
    <Box py="2" px="3">
      <Text>
        <Text fontSize={16} numberOfLines={2}>
          ĐẦM CỔ TIM TAY PHỒNG PHỐI CÚC NGỰC LD194 | ABC | XYZ
        </Text>
        <Text fontSize={14} color="gray6">
          {`   #989484   `}
        </Text>
        <Text
          style={{ backgroundColor: '#f2fcf5', paddingLeft: 16 }}
          fontSize={14}
          color="green">
          {` Còn hàng `}
        </Text>
      </Text>

      <Box height={8} />

      <Box flexDirection="row" alignItems="center">
        <Text fontWeight="700" fontSize={20} color="primary">
          {moneyFormat(1234567)}
        </Text>
        <Text
          mx="2"
          textDecorationStyle="solid"
          textDecorationLine="line-through"
          fontWeight="400"
          fontSize={14}
          color="gray6">
          {moneyFormat(1234567)}
        </Text>
        <Box bg="yellow" px="1" py="0.5">
          <Text color="primary" fontWeight="500" fontSize={10}>
            -20%
          </Text>
        </Box>
      </Box>

      <Box height={8} />

      <Box flexDirection="row" alignItems="center">
        <ProductColorPicker />
        <CButton filled px="5">
          Mua ngay
        </CButton>
      </Box>

      <Box height={8} />

      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        height={30}>
        <SizePicker sizes={dummySizeArray} selectedId={1} />
        <AmountPicker
          initialValue={1}
          maxValue={10}
          onPick={value => {
            // console.log(value);
          }}
        />
      </Box>

      <Box height={8} />

      <HyperLink
        image={Images.ruler}
        title="Cách chọn size"
        url="https://google.com"
      />

      <Box height={8} />

      <HyperLink
        image={Images.marker}
        title="Tìm sản phẩm tại showroom"
        url="https://google.com"
      />

      <Box height={10} bg="gray9" my="6" />

      <SegmentedControl
        selectedIndex={selectedSegmentIndex}
        onSelect={setSelectedSegmentIndex}
        items={['CHÍNH SÁCH ĐỔI TRẢ', 'CHI TIẾT SẢN PHẨM']}
      />
      <Box height={16} />
      {selectedSegmentIndex == 0 && (
        <ExpandableText
          text={faker.lorem.paragraphs({ min: 5, max: 10 })}
          minHeight={200}
          expanded={isReturnPrivacyExpanded}
          toggleExpanded={() => setIsReturnPrivacyExpanded(prev => !prev)}
        />
      )}

      <Box height={10} bg="gray9" my="6" />

      <Box>
        <Text textAlign="center" fontSize={20} fontWeight="700" mb="4">
          MUA CÙNG VỚI
        </Text>

        <ProductSlider
          data={Array.from({ length: 10 }, () => {
            {
            }
          })}
        />
      </Box>

      <Box height={10} bg="gray9" my="6" />

      <ProductDetailCaption text="THÔNG TIN SẢN PHẨM" />

      <Box height={16} />

      <ExpandableText
        text={faker.lorem.paragraphs({ min: 5, max: 10 })}
        minHeight={200}
        expanded={isReturnPrivacyExpanded}
        toggleExpanded={() => setIsReturnPrivacyExpanded(prev => !prev)}
      />

      <Box height={10} bg="gray9" my="6" />

      <ProductDetailCaption text="ĐÁNH GIÁ KHÁCH HÀNG" />

      <Box height={16} />

      <ProductRating />

      <Box height={16} />

      <ProductCommentList />

      <Box height={10} bg="gray9" my="6" />

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
      />
    </Box>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
