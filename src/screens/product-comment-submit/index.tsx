import React, { useState } from 'react';
import { Box } from '@lamia/utils/theme';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigationType, AppStackParams } from '@lamia/navigation/types';
import CTextInput from '@lamia/components/shared/custom-text-input';
import CButton from '@lamia/components/shared/custom-button';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import { postReview } from './actions';
import ToastHelper from '@lamia/utils/toast-helper';
import { Rating } from 'react-native-ratings';
import { Images } from '@lamia/utils/images';
import Spinner from 'react-native-loading-spinner-overlay';
import { Colors } from '@lamia/utils/theme/colors';

type ProductCommentSubmitScreenProps = RouteProp<
  AppStackParams,
  'ProductCommentSubmit'
>;

const ProductCommentSubmitScreen = () => {
  const route = useRoute<ProductCommentSubmitScreenProps>();
  const { productId } = route.params ?? {};
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AppNavigationType>();
  const { loading } = useAppSelector(state => state.reviewSubmitScreen);

  const submit = () => {
    if (message === '') {
      ToastHelper.showToast('Lỗi', 'Vui lòng nhập nội dung');
    }

    dispatch(
      postReview({
        message,
        productId,
        rating,
        onFinish: () => {
          navigation.pop();
        },
      }),
    );
  };

  const ratingCompleted = (_rating: number) => {
    setRating(_rating);
  };

  return (
    <Box flex={1} p="4" backgroundColor="white">
      <Spinner
        visible={loading}
        textContent={'Đang gửi ...'}
        color={Colors.primary}
      />
      <Box justifyContent="flex-start">
        <Rating
          type="custom"
          ratingImage={Images.starRating}
          ratingColor="#F6C001"
          ratingBackgroundColor="#EAECF0"
          ratingCount={5}
          imageSize={32}
          jumpValue={0.5}
          startingValue={5}
          onFinishRating={ratingCompleted}
          style={{}}
        />
      </Box>

      <Box
        borderRadius="rounded"
        borderWidth={1}
        borderColor="gray200"
        px="2"
        mt="4"
        height={100}>
        <CTextInput
          multiline
          value={message}
          onChangeText={setMessage}
          placeholder="Hãy cho shop biết suy nghĩ của bạn"
        />
      </Box>

      <Box mt="4">
        <CButton filled onPress={submit}>
          Gửi
        </CButton>
      </Box>
    </Box>
  );
};

export default ProductCommentSubmitScreen;
