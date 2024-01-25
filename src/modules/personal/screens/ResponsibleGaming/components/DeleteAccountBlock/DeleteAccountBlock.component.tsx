import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from 'components/Button';
import { CustomTextCheckbox } from 'components/CustomTextCheckbox';
import { TEXT_VARIANTS } from 'config/theme';
import { LockDurationEnum } from 'core/enums/selfLimits';
import { RootStackParamList } from 'core/interfaces/navigation';
import React, { FC, memo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

import { PATHS } from 'constants/PATHS';

import { styles } from './DeleteAccountBlock.styles';

interface Props {
  isLoading: boolean;
  onPressLock: (value: LockDurationEnum) => void;
}

export const DeleteAccountBlock: FC<Props> = memo(
  ({ isLoading, onPressLock }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [isConfirmed, setIsConfirmed] = useState(false);
    const { t } = useTranslation();

    const handlePressLock = () => {
      onPressLock(LockDurationEnum.PERMANENTLY);
    };

    const onPressGoToVerification = () => {
      navigation.navigate(PATHS.VERIFICATION);
    };
    const onPressGoToWithdrawal = () => {
      navigation.navigate(PATHS.BALANCE);
    };

    const onChangeCheckBox = (value: boolean) => {
      setIsConfirmed(value);
    };

    return (
      <View style={styles.container}>
        <Text style={TEXT_VARIANTS.font14}>
          <Trans
            i18nKey="LOCK_INDEFINETELY_FUNCTION.DESC"
            t={t}
            components={[
              <Text
                onPress={onPressGoToVerification}
                key="1"
                style={(TEXT_VARIANTS.font14, styles.underlineText)}
              />,
              <Text
                onPress={onPressGoToWithdrawal}
                key="2"
                style={(TEXT_VARIANTS.font14, styles.underlineText)}
              />,
            ]}
          />
        </Text>

        <CustomTextCheckbox
          containerStyles={styles.checkboxContainer}
          activeCheckboxStyles={styles.checkboxActive}
          inactiveCheckboxStyles={styles.checkboxInactive}
          helpText={() => (
            <Text style={[TEXT_VARIANTS.font14, styles.checkboxText]}>
              {t('LOCK_INDEFINETELY_FUNCTION.ACCOUNT_DELETE_CONFIRMATION_TEXT')}
            </Text>
          )}
          onChange={onChangeCheckBox}
          isChecked={isConfirmed}
        />

        <Button
          isLoading={isLoading}
          isDisabled={!isConfirmed}
          containerStyles={styles.button}
          onPress={handlePressLock}
          text={t('DELETE_ACCOUNT')}
        />
      </View>
    );
  },
);
