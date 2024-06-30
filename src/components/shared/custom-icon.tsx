import React from 'react';
import { Pressable, ViewProps } from 'react-native';
import CImage from './custom-image';
import { Theme } from '@lamia/utils/theme';
import {
  BorderProps,
  ColorProps,
  SpacingProps,
  SpacingShorthandProps,
  border,
  color,
  composeRestyleFunctions,
  spacing,
  spacingShorthand,
  useRestyle,
} from '@shopify/restyle';

type RestyleProps = SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  BorderProps<Theme> &
  ColorProps<Theme>;

interface CIconExtendProps {
  size?: number;
  image?: any;
  disabled?: boolean;
  onPress?: () => void;
}

interface CIconProps extends ViewProps, RestyleProps, CIconExtendProps {}

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  spacingShorthand,
  border,
  color,
]);

const CIcon = (_props: CIconProps) => {
  const restyleProps: Omit<CIconProps, keyof CIconExtendProps> = { ..._props };
  const props: CIconProps = {
    ..._props,
    ...useRestyle(restyleFunctions, restyleProps),
  };
  const size = props.size ?? 20;

  return (
    <Pressable
      hitSlop={8}
      {...props}
      disabled={!props.onPress || props.disabled}
      onPress={props.onPress}>
      <CImage
        resizeMode="contain"
        source={props.image}
        size={size}
        color={props.color}
      />
    </Pressable>
  );
};

export default CIcon;
