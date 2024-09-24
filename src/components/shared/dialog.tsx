import React from 'react';
import Popup from './popup';
import { Box, Text } from '@lamia/utils/theme';
import CButton from './custom-button';

interface DialogProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}
const Dialog = ({
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  visible,
  onConfirm,
  onCancel,
  title,
  message,
}: DialogProps) => {
  return (
    <Popup visible={visible}>
      <Box p="2">
        <Text fontWeight="bold" textAlign="center" fontSize={16}>
          {title}
        </Text>
        <Box height={10} />
        <Text textAlign="center" fontSize={16}>
          {message}
        </Text>
        <Box flexDirection="row" mt="4" justifyContent="space-around">
          <CButton onPress={onCancel}>{cancelText}</CButton>
          <CButton textColor="red" onPress={onConfirm}>
            {confirmText}
          </CButton>
        </Box>
      </Box>
    </Popup>
  );
};

export default Dialog;
