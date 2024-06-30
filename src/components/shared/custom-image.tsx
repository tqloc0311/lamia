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

const CImage = (_props: CImageProps) => {
  const restyleProps: Omit<CImageProps, keyof CImageExtendProps> = {
    ..._props,
  };

  const props: CImageProps = {
    ..._props,
    ...useRestyle(restyleFunctions, restyleProps),
  };

  const opacity = props.opacity ?? 1;
  let width: any = '100%';
  let height: any = '100%';

  if (props.size) {
    width = props.size;
    height = props.size;
  } else if (props.width && props.height) {
    width = props.width;
    height = props.height;
  }

  const defaultStyle: StyleProp<ImageStyle> = {
    width,
    height,
    opacity,
  };

  const combinedStyle: StyleProp<any> = combineStyles(
    defaultStyle,
    props.style,
  ) as StyleProp<any>;

  const { color, ...excludedColorStyle } = combinedStyle;
  return (
    <Image
      resizeMode="contain"
      {...props}
      tintColor={props.color ? Colors[props.color] : undefined}
      style={excludedColorStyle}
    />
  );
};

export default CImage;
