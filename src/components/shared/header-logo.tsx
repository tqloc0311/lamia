import React from 'react';
import { Images } from '../../utils/images';
import {
  ColorProps,
  color,
  composeRestyleFunctions,
  useRestyle,
} from '@shopify/restyle';
import { Theme } from '@lamia/utils/theme';
import CImage from './custom-image';
import Layout from '@lamia/constants/Layout';

type RestyleProps = ColorProps<Theme>;

interface HeaderLogoProps extends RestyleProps {}

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([color]);

const HeaderLogo = (_props: HeaderLogoProps) => {
  const props = useRestyle(restyleFunctions, _props);
  const color = props.color ?? 'primary';

  return (
    <CImage
      resizeMode="contain"
      width={Layout.window.width * 0.4}
      height={24}
      source={Images.headerLogo}
      color={color}
    />
  );
};

export default HeaderLogo;
