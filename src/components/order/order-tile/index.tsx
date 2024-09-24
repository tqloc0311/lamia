import CImage from '@lamia/components/shared/custom-image';
import { IOrder } from '@lamia/models/order';
import { moneyFormat } from '@lamia/utils/helpers';
import { Images } from '@lamia/utils/images';
import svgs from '@lamia/utils/svgs';
import { Box, Text } from '@lamia/utils/theme';
import React from 'react';
import { ViewProps } from 'react-native';

interface OrderTileProps extends ViewProps {
  data: IOrder;
}
const OrderTile = ({ data, style }: OrderTileProps) => {
  const Delivery = svgs.Delivery;

  return (
    <Box p="3" style={style}>
      <Box flexDirection="row">
        <Text fontWeight="600">{`Đơn hàng #${data?.id}`}</Text>
        <Box flex={1} />
        <Box flexDirection="row" alignItems="center">
          <Delivery width={14} height={14} fill="#f00" />
          <Box width={4} />
          <Text>{data.status}</Text>
        </Box>
      </Box>

      <Box backgroundColor="gray200" width="100%" height={1} my="2.5" />

      <Box flexDirection="row">
        <CImage
          size={64}
          source={{ uri: data.products?.[0]?.image }}
          defaultSource={Images.noImage}
        />

        <Box width={12} />

        <Box flex={1} height="100%">
          <Box flex={1}>
            <Text numberOfLines={2}>{data.products?.[0]?.name}</Text>
          </Box>
          <Box height={6} />
          <Box flexDirection="row">
            {data.products?.[0]?.variation_attributes && (
              <Text>{data.products?.[0]?.variation_attributes}</Text>
            )}
            <Box flex={1} />
            <Box height={20} flexDirection="row">
              <Text fontWeight="700" fontSize={14} color="primary">
                {moneyFormat(parseInt(data.products?.[0]?.price || '0', 10))}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box backgroundColor="gray200" width="100%" height={1} my="2.5" />

      <Box flexDirection="row">
        <Box flex={1} />
        <Text fontSize={14} color="primary">
          Thành tiền:
        </Text>
        <Box width={8} />
        <Text fontWeight="700" fontSize={14} color="primary">
          {moneyFormat(parseInt(data.sub_total || '0', 10))}
        </Text>
      </Box>
    </Box>
  );
};

export default OrderTile;
