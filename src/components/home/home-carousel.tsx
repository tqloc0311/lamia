import React from 'react';
import { interpolate } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { Box } from '@lamia/utils/theme';
import Layout from '../../constants/Layout';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationType } from '@lamia/navigation/types';
import HomeCarouselItem from './home-carousel-item';
import { useAppSelector } from '@lamia/hooks/context';

const PAGE_WIDTH = Layout.window.width;

type TAnimationStyle = (value: number) => {
  transform: { translateX: number }[];
  zIndex: number;
};

interface HomeCarouselProps {}

const HomeCarousel = (_: HomeCarouselProps) => {
  const navigation = useNavigation<AppNavigationType>();

  const { banners } = useAppSelector(state => state.banners);
  const imageUrls = banners.map(banner => banner.imageUrl);

  const animationStyle: TAnimationStyle = React.useCallback((value: number) => {
    'worklet';

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const translateX = interpolate(
      value,
      [-2, 0, 1],
      [-PAGE_WIDTH, 0, PAGE_WIDTH],
    );

    return {
      transform: [{ translateX }],
      zIndex,
    };
  }, []);

  return (
    <Box flex={1}>
      <Carousel
        loop
        data={imageUrls}
        renderItem={({ index, animationValue }) => {
          const url = imageUrls[index];
          return (
            <HomeCarouselItem
              key={url}
              url={url}
              animationValue={animationValue}
              onPress={() => navigation.navigate('Products')}
            />
          );
        }}
        style={{ width: PAGE_WIDTH }}
        width={PAGE_WIDTH}
        customAnimation={animationStyle}
        scrollAnimationDuration={800}
      />
    </Box>
  );
};

export default HomeCarousel;
