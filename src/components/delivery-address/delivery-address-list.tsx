import React, { useCallback, useEffect, useState } from 'react';
import { Box, Text } from '@lamia/utils/theme';
import DeliveryAddressItem from '@lamia/components/delivery-address/delivery-address-item';
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  RefreshControl,
} from 'react-native';
import CImage from '@lamia/components/shared/custom-image';
import { Images } from '@lamia/utils/images';
import { NativeStackNavigationBaseType } from '@lamia/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import { IAddress } from '@lamia/models/address';
import DeliveryAddressListSkeleton from './delivery-address-list-skeleton';
import { Colors } from '@lamia/utils/theme/colors';
import { fetchDeliveryAddresses } from './actions';
import { useEffectOnce } from 'react-use';
import { setDeliveryAddress } from '@lamia/redux/slices/cartSlice';

interface DeliveryAddressListProps {
  hideSelection?: boolean;
  onSelect?: (item: IAddress) => void;
}

const DeliveryAddressList = (props: DeliveryAddressListProps) => {
  const navigation = useNavigation<NativeStackNavigationBaseType>();
  const dispatch = useAppDispatch();
  const { addresses } = useAppSelector(state => state.addresses);
  const { loading } = useAppSelector(state => state.deliveryAddressScreen);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!selectedAddress) {
      setSelectedAddress(addresses.find(item => item.default_address));
    }
  }, [addresses, selectedAddress]);

  useEffect(() => {
    if (selectedAddress) {
      dispatch(setDeliveryAddress(selectedAddress));
    }
  }, [dispatch, selectedAddress]);

  useEffectOnce(() => {
    onRefresh();
  });

  const renderItem = (itemData: ListRenderItemInfo<IAddress>) => {
    return (
      <DeliveryAddressItem
        hideSelection={props.hideSelection}
        onSelect={() => setSelectedAddress(itemData.item)}
        onEdit={() =>
          navigation.navigate('EditDeliveryAddress', { address: itemData.item })
        }
        selected={selectedAddress?.id === itemData.item.id}
        data={itemData.item}
      />
    );
  };

  const renderHeader = useCallback(() => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('EditDeliveryAddress');
        }}>
        <Box borderBottomColor="gray8" borderBottomWidth={1}>
          <Box
            borderStyle="dashed"
            borderWidth={1}
            borderColor="blurDark1"
            my="4"
            mx="3"
            p="3"
            bg="blueLight1"
            flexDirection="row"
            alignItems="center"
            justifyContent="center">
            <CImage source={Images.plus} size={20} />
            <Text ml="2" color="blurDark1" fontSize={14} fontWeight="500">
              Thêm địa chỉ mới
            </Text>
          </Box>
        </Box>
      </Pressable>
    );
  }, [navigation]);

  const onRefresh = () => {
    dispatch(fetchDeliveryAddresses());
  };

  return (
    <Box flex={1}>
      {!loading ? (
        <FlatList
          data={addresses}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          ListHeaderComponent={renderHeader}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
        />
      ) : (
        <DeliveryAddressListSkeleton />
      )}
    </Box>
  );
};

export default DeliveryAddressList;
