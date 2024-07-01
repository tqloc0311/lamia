import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Box } from '@lamia/utils/theme';
import CIcon from '../shared/custom-icon';
import { Images } from '@lamia/utils/images';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationType } from '@lamia/navigation/types';
import { useAppSelector } from '@lamia/hooks/context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useUpdateEffect } from 'react-use';

const CartButton = () => {
  const navigation = useNavigation<AppNavigationType>();
  const { cartItems } = useAppSelector(state => state.cart);
  const badge = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const animateScale = useSharedValue(1);
  const animateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animateScale.value }],
    };
  });

  useUpdateEffect(() => {
    const duration = 500;
    animateScale.value = withSpring(1.5, { duration });

    setTimeout(() => {
      animateScale.value = withSpring(1, { duration });
    }, duration + 10);
  }, [cartItems]);

  return (
    <Box style={styles.cartContainer}>
      <CIcon
        image={Images.cart}
        size={20}
        mr="4"
        onPress={() => {
          navigation.navigate('Cart');
        }}
      />
      {badge > 0 && (
        <Animated.View style={[styles.badgeContainer, animateStyle]}>
          <Text style={styles.badge}>{`${badge}`}</Text>
        </Animated.View>
      )}
    </Box>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeContainer: {
    backgroundColor: '#f00',
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    position: 'absolute',
    right: 6,
    top: -4,
  },
  badge: {
    color: 'white',
    textAlign: 'center',
    fontSize: 8,
    alignSelf: 'center',
  },
});
