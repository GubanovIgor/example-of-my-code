import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomSelectorInput } from 'components/CustomSelectorInput';
import { RootStackParamList } from 'core/interfaces/navigation';
import { convertPaymentOptionsForCustomPicker } from 'core/utils/convertPaymentOptionsForCustomSelectorInput';
import React, { useCallback, useState } from 'react';
import { graphql, useFragment } from 'react-relay';
import { SelectField_fragment$key } from 'queries/__generated__/SelectField_fragment.graphql';
import { CustomPickerValue } from 'core/interfaces';

import { PATHS } from 'constants/PATHS';

import { styles } from './SelectField.styles';

const SelectFragment = graphql`
  fragment SelectField_fragment on SelectField {
    __typename
    key
    name
    options {
      optionId
      name
      value
    }
  }
`;

export const SelectField = ({
  fragmentRef,
}: {
  fragmentRef: SelectField_fragment$key;
}) => {
  const data = useFragment(SelectFragment, fragmentRef);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [chosenOption, setChosenOption] = useState<CustomPickerValue>();

  const handleSelectorItem = useCallback((valueData: CustomPickerValue) => {
    setChosenOption(valueData);
  }, []);

  const openSelectorModal = useCallback(() => {
    navigation.navigate(PATHS.CUSTOM_PICKER, {
      data: convertPaymentOptionsForCustomPicker(data?.options),
      handleSelectorItem,
    });
  }, [data.options, handleSelectorItem, navigation]);

  return (
    <CustomSelectorInput
      onPressHandler={openSelectorModal}
      styleProps={styles.field}
      placeholder={data.name || ''}
      name={data.key || ''}
      chosenOption={chosenOption}
    />
  );
};
