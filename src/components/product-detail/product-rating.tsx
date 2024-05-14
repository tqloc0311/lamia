import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Box, Text } from '@lamia/utils/theme';
import { Rating } from 'react-native-ratings';
import { Images } from '@lamia/utils/images';
import RatingProgress from '../shared/rating-progress';

const ProductRating = () => {
  return (
    <Box flexDirection="row" height={128}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box mb="1">
          <Text fontSize={28} color="yellow" fontWeight="500">
            4.5
          </Text>
        </Box>
        <Rating
          readonly
          type="custom"
          ratingImage={Images.starRating}
          ratingColor="#F6C001"
          ratingBackgroundColor="#EAECF0"
          ratingCount={5}
          imageSize={18}
          jumpValue={0.5}
          startingValue={0.5}
          onFinishRating={() => {}}
          style={{}}
        />
        <Box mt="2">
          <Pressable onPress={() => {}}>
            <Text
              fontSize={14}
              textDecorationStyle="solid"
              textDecorationLine="underline"
              color="blurDark1">
              99 đánh giá
            </Text>
          </Pressable>
        </Box>
      </Box>
      <Box flex={1}>
        <RatingProgress ml="2" flex={1} leadingTitle="1" value={0.5} />
        <RatingProgress ml="2" flex={1} leadingTitle="2" value={0.1} />
        <RatingProgress ml="2" flex={1} leadingTitle="3" value={0.6} />
        <RatingProgress ml="2" flex={1} leadingTitle="4" value={0.5} />
        <RatingProgress ml="2" flex={1} leadingTitle="5" value={0.5} />
      </Box>
    </Box>
  );
};

export default ProductRating;

const styles = StyleSheet.create({});
