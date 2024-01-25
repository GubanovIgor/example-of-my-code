import React, { FC, useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TEXT_VARIANTS } from 'config/theme';
import { RootStackParamList } from 'core/interfaces/navigation';
import { TouchableOpacity, View, Text, TextInputProps } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CustomTextInput } from 'components/CustomTextInput/CustomTextInput.component';
import CrossIcon from 'assets/icons/cross.svg';
import { VoidFunction } from 'core/interfaces';
import { noop } from 'lodash';

import { styles } from './SearchInput.styles';

interface SearchInputProps extends TextInputProps {
  onSearch: (text: string) => void;
  onClearSearch?: VoidFunction;
  placeholder?: string;
}

const getCrossBtnRenderer = (onPress: () => void) => (
  <TouchableOpacity onPress={onPress} style={styles.crossBtn}>
    <CrossIcon />
  </TouchableOpacity>
);

export const SearchInput: FC<SearchInputProps> = ({
  onSearch,
  onClearSearch = noop,
  placeholder = 'ex. Solar Queen',
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const onBlur = useCallback(() => {
    onClearSearch();
  }, [onClearSearch]);

  const onPressCancel = () => {
    navigation.pop();
  };

  const onChangeText = useCallback(
    ({ target: { value } }: { target: { value: string } }) => {
      if (!value) {
        onBlur();
        onSearch(value);
      }
      setSearchValue(value);
      if (value.length <= 2) return;
      onSearch(value);
    },
    [onBlur, onSearch],
  );

  const onPressClearInput = useCallback(() => {
    setSearchValue('');
    onClearSearch();
  }, [onClearSearch]);

  const renderCrossBtn = useMemo(
    () => (searchValue ? getCrossBtnRenderer(onPressClearInput) : null),
    [onPressClearInput, searchValue],
  );

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <CustomTextInput
          {...props}
          value={searchValue}
          onChange={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          rightAccessory={renderCrossBtn}
        />
      </View>

      <TouchableOpacity
        style={styles.cancelBtn}
        hitSlop={{ top: 12, bottom: 12, right: 12, left: 12 }}
        onPress={onPressCancel}
      >
        <Text style={[TEXT_VARIANTS.font14, styles.cancelBtnText]}>
          {t('CANCEL')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
