import React from 'react';
import {
  StyleProp,
  Text,
  ViewStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, TEXT_VARIANTS } from 'config/theme';
import { graphql, useFragment } from 'react-relay';
import { DepositMethodItem_fragment$key } from 'queries/__generated__/DepositMethodItem_fragment.graphql';
import { VoidFunction } from 'core/interfaces';
import { CustomImage } from 'components/CustomImage';

import { styles } from './DepositMethodItem.styles';

interface Props {
  stylesProp?: StyleProp<ViewStyle>;
  paymentMethodRef: DepositMethodItem_fragment$key;
  chosenMethodId?: string;
  onPress: VoidFunction;
}

const fragment = graphql`
  fragment DepositMethodItem_fragment on PaymentHandlerV2 {
    id
    imageUrl
    name
  }
`;

export const DepositMethodItem = ({
  paymentMethodRef,
  chosenMethodId,
  stylesProp,
  onPress,
}: Props) => {
  const paymentMethod = useFragment(fragment, paymentMethodRef);

  const borderColor =
    paymentMethod?.id === chosenMethodId ? COLORS.PRIMARY : COLORS.ON_PRIMARY;

  return (
    <TouchableOpacity
      style={[
        styles.depositMethodContainer,
        stylesProp,
        {
          borderColor,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <CustomImage
          url={paymentMethod.imageUrl}
          width="100%"
          height="100%"
          shouldCheckForValidSvg
        />
      </View>
      <Text style={[TEXT_VARIANTS.font12, styles.depositMethodTitle]}>
        {paymentMethod.name}
      </Text>
    </TouchableOpacity>
  );
};
