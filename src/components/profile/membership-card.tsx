import React from 'react';
import { ViewProps } from 'react-native';
import { Box, Theme } from '@lamia/utils/theme';
import {
  BorderProps,
  SpacingProps,
  SpacingShorthandProps,
  border,
  composeRestyleFunctions,
  spacing,
  spacingShorthand,
  useRestyle,
} from '@shopify/restyle';

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  SpacingShorthandProps<Theme>;

interface MembershipCardProps extends ViewProps, RestyleProps {}

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  spacingShorthand,
  border,
]);

const MembershipCard = (_props: MembershipCardProps) => {
  const props = useRestyle(restyleFunctions, _props);

  return <Box borderRadius="rounded" bg="primary" height={170} {...props} />;
};

export default MembershipCard;
