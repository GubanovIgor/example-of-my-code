import React, { FC, memo, useMemo } from 'react';
import { Button } from 'components/Button';
import { FormTextInput } from 'components/FormTextInput';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { COLORS, TEXT_VARIANTS } from 'config/theme';
import { formatDate } from 'core/utils';
import { GetTranslationValue } from 'core/interfaces';
import { LimitType } from 'queries/__generated__/ResponsibleGamingLimitsMutation.graphql';

import { SelfLimitItem, SelfLimitTrio } from '../../ResponsibleGaming.types';
import { styles } from './LimitBlock.styles';
import {
  getIsSaveAvailable,
  getLimitFormDefaultValues,
} from './LimitBlock.helpers';
import { LimitsFormValues } from './LimitBlock.types';

interface Props {
  isLoading: boolean;
  limits?: SelfLimitTrio;
  maxSessionTime?: SelfLimitItem;
  onSaveLimits: (data: any, type?: LimitType) => void;
  type?: LimitType;
  currencySymbol?: string | null;
}

const renderInputBottomInfo = (
  t: GetTranslationValue,
  item?: SelfLimitItem,
  currencySymbol?: string | null,
) => {
  if (!item?.nextPossibleIncreasing && !item?.used) return null;

  return (
    <View style={styles.inputBottomInfoContainer}>
      {Boolean(item.nextPossibleIncreasing) && (
        <Text style={[TEXT_VARIANTS.font12, styles.nextPossibleDateText]}>
          {`${t('NEXT_POSSIBLE_CHANGE')} ${formatDate(
            item?.nextPossibleIncreasing,
            'DD/MM/YYYY HH:mm',
          )}`}
        </Text>
      )}
      {Boolean(item?.used) && (
        <Text style={[TEXT_VARIANTS.font12, styles.usedText]}>
          {`${t('USED')}: ${item?.used.toFixed(0)} ${
            currencySymbol ? currencySymbol : t('MINUTES')
          }`}
        </Text>
      )}
    </View>
  );
};
export const LimitBlock: FC<Props> = memo(
  ({
    limits,
    isLoading,
    currencySymbol,
    type,
    maxSessionTime,
    onSaveLimits,
  }) => {
    const { t } = useTranslation();
    const formMethods = useForm<LimitsFormValues>({
      mode: 'onChange',
      defaultValues: maxSessionTime
        ? { maxSessionTime: maxSessionTime?.currentLimit?.toString() }
        : getLimitFormDefaultValues(limits),
    });

    const {
      getValues,
      handleSubmit,
      formState: { isDirty },
    } = formMethods;

    const values = getValues();

    const handlePressSave = (data: LimitsFormValues) => {
      onSaveLimits(data, type);
    };

    const isSaveAvailable = useMemo(
      () => getIsSaveAvailable(values, isDirty, limits),
      [isDirty, limits, values],
    );

    return (
      <View>
        <FormProvider {...formMethods}>
          {maxSessionTime ? (
            <>
              <FormTextInput
                activeLabelColor={COLORS.DARK_BACKGROUND}
                isRequired={false}
                styleProps={[styles.input, styles.inputMargin]}
                placeholder={t('LIMIT') || ''}
                keyboardType="number-pad"
                name="maxSessionTime"
              />
              {renderInputBottomInfo(t, maxSessionTime)}
            </>
          ) : (
            <>
              <FormTextInput
                activeLabelColor={COLORS.DARK_BACKGROUND}
                isEditable={!limits?.perDay?.nextPossibleIncreasing}
                isRequired={false}
                styleProps={styles.input}
                placeholder={t('DAILY') || ''}
                keyboardType="number-pad"
                name="perDay"
              />
              {renderInputBottomInfo(t, limits?.perDay, currencySymbol)}

              <FormTextInput
                activeLabelColor={COLORS.DARK_BACKGROUND}
                isEditable={!limits?.perWeek?.nextPossibleIncreasing}
                isRequired={false}
                styleProps={[styles.input, styles.inputMargin]}
                placeholder={t('WEEKLY') || ''}
                keyboardType="number-pad"
                name="perWeek"
              />
              {renderInputBottomInfo(t, limits?.perWeek, currencySymbol)}

              <FormTextInput
                isEditable={!limits?.perWeek?.nextPossibleIncreasing}
                activeLabelColor={COLORS.DARK_BACKGROUND}
                isRequired={false}
                styleProps={[styles.input, styles.inputMargin]}
                placeholder={t('MONTHLY') || ''}
                keyboardType="number-pad"
                name="perMonth"
              />
              {renderInputBottomInfo(t, limits?.perMonth, currencySymbol)}
            </>
          )}
        </FormProvider>

        <Button
          isLoading={isLoading}
          isDisabled={!isSaveAvailable}
          containerStyles={styles.button}
          onPress={handleSubmit(handlePressSave)}
          text={t('SAVE')}
        />
      </View>
    );
  },
);
