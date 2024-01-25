import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from 'components/Button';
import { CustomPicker } from 'components/CustomPicker';
import { CustomPickerValue } from 'core/interfaces';
import { RootStackParamList } from 'core/interfaces/navigation';
import React, { FC, memo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { LockDurationEnum } from 'core/enums/selfLimits';
import { CustomTextCheckbox } from 'components/CustomTextCheckbox';
import { TEXT_VARIANTS } from 'config/theme';

import { PATHS } from 'constants/PATHS';

import { styles } from './LockUntilBlock.styles';
import { getLockUntilDate, getPeriods } from './LockUntilBlock.helpers';

interface Props {
  isLoading: boolean;
  firstName?: string | null;
  onPressLock: (value: LockDurationEnum) => void;
}

export const LockUntilBlock: FC<Props> = memo(
  ({ firstName, isLoading, onPressLock }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [chosenPeriod, setChosenPeriod] = useState<CustomPickerValue>();

    const { t } = useTranslation();
    const formMethods = useForm();

    const onSelectPeriod = (item: CustomPickerValue) => {
      setChosenPeriod(item);
    };

    const onChangeCheckBox = (value: boolean) => {
      setIsConfirmed(value);
    };

    const onPressSelector = () => {
      navigation.navigate(PATHS.CUSTOM_PICKER, {
        //@ts-ignore
        data: getPeriods(t),
        adjustToContentHeight: true,
        handleSelectorItem: onSelectPeriod,
        showSearch: false,
        itemsAlign: 'center',
      });
    };

    const handlePressLock = () => {
      if (!chosenPeriod?.id) return;

      onPressLock(chosenPeriod?.id as LockDurationEnum);
    };

    return (
      <View>
        <FormProvider {...formMethods}>
          <Text style={TEXT_VARIANTS.font14}>
            <Trans
              i18nKey="LOCK_UNTILL_FUNCTION.DESC"
              t={t}
              components={[<Text key="1" style={TEXT_VARIANTS.font14Bold} />]}
              values={{ firstName }}
            />
          </Text>
          <CustomPicker
            chosenOption={chosenPeriod}
            onPress={onPressSelector}
            containerStyles={styles.selector}
            placeholder={t('SELECT_TIME_OR_PERIOD').toString()}
          />
          {chosenPeriod && (
            <CustomTextCheckbox
              containerStyles={styles.checkboxContainer}
              activeCheckboxStyles={styles.checkboxActive}
              inactiveCheckboxStyles={styles.checkboxInactive}
              helpText={() => (
                <Text style={[TEXT_VARIANTS.font14, styles.checkboxText]}>
                  {t('LOCK_UNTILL_FUNCTION.TERM', {
                    period: chosenPeriod.value,
                    time: getLockUntilDate(chosenPeriod.id as LockDurationEnum),
                  })}
                </Text>
              )}
              onChange={onChangeCheckBox}
              isChecked={isConfirmed}
            />
          )}
          <Button
            isLoading={isLoading}
            isDisabled={!chosenPeriod || !isConfirmed}
            containerStyles={styles.button}
            onPress={handlePressLock}
            text={t('LOCK_UNTILL_FUNCTION.BUTTON')}
          />
        </FormProvider>
      </View>
    );
  },
);
