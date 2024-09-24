import React from 'react';
import { Box } from '@lamia/utils/theme';
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import CImage from '../shared/custom-image';
import { Pressable, StyleSheet } from 'react-native';
import Layout from '@lamia/constants/Layout';

interface HomeCarouselItemProps {
  url: string | undefined;
  animationValue: SharedValue<number>;
  onPress?: () => void;
}

const HomeCarouselItem: React.FC<HomeCarouselItemProps> = ({
  url,
  animationValue,
  onPress,
}) => {
  const maskStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ['#000000dd', 'transparent', '#000000dd'],
    );

    return {
      backgroundColor,
    };
  }, [animationValue]);

  return (
    <Box flex={1}>
      <Pressable onPress={onPress}>
        <CImage
          key={url}
          style={styles.image}
          source={{ uri: url }}
          resizeMode="contain"
        />
        <Animated.View
          pointerEvents="none"
          style={[styles.absoluteFill, maskStyle]}
        />
      </Pressable>
    </Box>
  );
};

export default HomeCarouselItem;

const styles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wrapper: {
    width: Layout.window.width,
    height: Layout.window.height,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
});
