import {
  BottomModal,
  Modal,
  ModalContent,
  SlideAnimation,
} from 'react-native-modals';

import React from 'react';

interface PopupProps {
  children: React.ReactNode;
  visible: boolean;
  onTouchOutside?: () => void;
  position?: 'bottom' | 'center';
}

const Popup = (props: PopupProps) => {
  const ModalComponent = props.position === 'bottom' ? BottomModal : Modal;
  return (
    <ModalComponent
      modalAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
          animationDuration: 200,
          useNativeDriver: true,
        })
      }
      visible={props.visible}
      onTouchOutside={props.onTouchOutside}>
      <ModalContent>{props.children}</ModalContent>
    </ModalComponent>
  );
};

export default Popup;
