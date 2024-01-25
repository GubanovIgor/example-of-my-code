import { GUTTER_SIZE } from 'config/theme';
import React, { forwardRef, ReactNode, RefObject } from 'react';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './ModalizeWrapper.styles';

interface ModalizeWrapperProps extends ModalizeProps {
  sheetRef?: RefObject<Modalize>;
  children: ReactNode;
}

export const ModalizeWrapper = forwardRef(
  (props: ModalizeWrapperProps, ref) => {
    const { children } = props;
    const { bottom } = useSafeAreaInsets();
    return (
      <Modalize
        handlePosition="inside"
        handleStyle={styles.handleStyle}
        modalStyle={styles.modalStyle}
        childrenStyle={{ paddingBottom: bottom + GUTTER_SIZE * 2 }}
        adjustToContentHeight
        ref={ref}
        {...props}
      >
        {children}
      </Modalize>
    );
  },
);
