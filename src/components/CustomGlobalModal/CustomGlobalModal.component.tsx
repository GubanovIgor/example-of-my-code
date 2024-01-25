import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useUtilsStore } from 'store/utilsStore';
import { shallow } from 'zustand/shallow';
import Modal from 'react-native-modal';
import { TEXT_VARIANTS } from 'config/theme';
import CrossIcon from 'assets/icons/cross.svg';

import { styles } from './CustomGlobalModal.styles';

interface CustomGlobalModalProps {}

export const CustomGlobalModal: FC<CustomGlobalModalProps> = () => {
  const { modalData, setModalData } = useUtilsStore(
    (state) => ({
      modalData: state.customModalData,
      setModalData: state.setCustomModalData,
    }),
    shallow,
  );

  const onCloseModal = () => {
    setModalData({ isVisible: false, message: '' });
  };

  return (
    <Modal
      useNativeDriver={true}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onSwipeComplete={onCloseModal}
      onBackdropPress={onCloseModal}
      onBackButtonPress={onCloseModal}
      backdropOpacity={0.3}
      style={styles.modal}
      isVisible={modalData.isVisible}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onCloseModal}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          style={styles.crossContainer}
        >
          <CrossIcon />
        </TouchableOpacity>
        <Text style={[TEXT_VARIANTS.font14, styles.text]}>
          {modalData.message || ''}
        </Text>
      </View>
    </Modal>
  );
};
