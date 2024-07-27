import React from 'react';
import { Image, ImageProps, ImageStyle, StyleProp } from 'react-native';
import { combineStyles } from '../../utils/helpers';
import {
  ColorProps,
  SpacingProps,
  SpacingShorthandProps,
  color,
  composeRestyleFunctions,
  spacing,
  spacingShorthand,
  useRestyle,
} from '@shopify/restyle';
import { Theme } from '@lamia/utils/theme';
import { Colors } from '@lamia/utils/theme/colors';

type RestyleProps = SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  ColorProps<Theme>;

interface CImageExtendProps {
  size?: number;
  width?: number;
  height?: number;
  opacity?: number;
}

interface CImageProps extends ImageProps, RestyleProps, CImageExtendProps {}

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  spacingShorthand,
  color,
]);

const CImage = (props: CImageProps) => {
  const {
    size,
    width: propWidth,
    height: propHeight,
    opacity = 1,
    style,
    color: propColor,
    ...rest
  } = props;

  const restyleProps = useRestyle(restyleFunctions, props);
  const width = size ?? propWidth ?? '100%';
  const height = size ?? propHeight ?? '100%';

  const defaultStyle: StyleProp<ImageStyle> = { width, height, opacity };
  const combinedStyle: StyleProp<any> = combineStyles(
    defaultStyle,
    style,
  ) as StyleProp<any>;
  return (
    <Image
      resizeMode="contain"
      {...rest}
      {...restyleProps}
      tintColor={propColor ? Colors[propColor] : undefined}
      style={combinedStyle}
    />
  );
};

export default CImage;
