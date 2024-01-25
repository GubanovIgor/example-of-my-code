import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { useLocalisationStore } from 'store/localisationStore';
import { useTranslation } from 'react-i18next';
import { GUTTER_SIZE, TEXT_VARIANTS } from 'config/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getYears } from './DatePicker.helpers';
import { WheelPicker } from './childComponents';
import { Button } from '../Button';
import { styles } from './DatePicker.styles';

dayjs.extend(localeData);
require('dayjs/locale/en');
require('dayjs/locale/pt');

const getDefaultYear = (values: string[], chosenValue?: string) => {
  const searchingValue = chosenValue?.toString() || dayjs().year().toString();

  return values?.findIndex((v) => v === searchingValue);
};
const getDefaultMonthIndex = (chosenValue?: string) =>
  chosenValue ? Number(chosenValue) - 1 : Number(dayjs().format('MM')) - 1;
const getDefaultDayIndex = (chosenValue?: string) =>
  chosenValue ? Number(chosenValue) - 1 : dayjs().date() - 1;

export interface DefaultDateValue {
  day: string;
  month: string;
  year: string;
}

interface Props {
  extraYears?: number;
  value?: DefaultDateValue;
  onValueChange: (value: string) => void;
}

export const DatePicker: FC<Props> = ({ value, onValueChange, extraYears }) => {
  const { currentLanguage } = useLocalisationStore((s) => s);

  const { bottom } = useSafeAreaInsets();

  const YEARS = getYears(extraYears);
  const [yearIndex, setYearIndex] = useState(
    getDefaultYear(YEARS, value?.year),
  );
  const [monthIndex, setMonthIndex] = useState(
    getDefaultMonthIndex(value?.month),
  );
  const [dayIndex, setDayindex] = useState(getDefaultDayIndex(value?.day));

  dayjs.locale(currentLanguage?.key);

  const { t } = useTranslation();

  const MONTHS = dayjs.localeData().months();

  const days = useMemo(
    () => Array.from(Array(31), (_, i) => i + 1).map(String),
    [],
  );

  const listRef = useRef<FlatList>(null);

  const onYearChange = useCallback((index: number) => {
    setYearIndex(index);
  }, []);

  const onMonthChange = useCallback(
    (index: number) => {
      const daysInMonth = dayjs(
        `${YEARS[yearIndex]}-${index + 1}`,
        'YYYY-M',
      ).daysInMonth();

      if (dayIndex + 1 > daysInMonth) {
        listRef?.current?.scrollToIndex({ index: daysInMonth - 1 });
      }

      setMonthIndex(index);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dayIndex, yearIndex],
  );
  const onDayChange = useCallback(
    (index: number) => {
      const day = index + 1;

      const daysInMonth = dayjs(
        `${YEARS[yearIndex]}-${monthIndex + 1}`,
        'YYYY-M',
      ).daysInMonth();

      if (day > daysInMonth) {
        listRef?.current?.scrollToIndex({ index: daysInMonth - 1 });
        return;
      }

      setDayindex(index);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [monthIndex, yearIndex],
  );

  const handlePressSave = useCallback(() => {
    const month = monthIndex + 1 < 10 ? `0${monthIndex + 1}` : monthIndex + 1;
    const day = dayIndex + 1 < 10 ? `0${dayIndex + 1}` : dayIndex + 1;
    const newValue = `${day}.${month}.${YEARS[yearIndex]}`;

    if (onValueChange) {
      onValueChange(newValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayIndex, monthIndex, onValueChange, yearIndex]);

  return (
    <View>
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFill}>
          <View style={styles.blueLine} />
        </View>
        <WheelPicker
          listRef={listRef}
          selectedIndicatorStyle={styles.selectedIndicator}
          containerStyle={styles.dayContainer}
          itemHeight={44}
          itemTextStyle={{ ...TEXT_VARIANTS.font24, ...styles.itemText }}
          selectedIndex={dayIndex}
          options={days}
          onChange={onDayChange}
        />
        <WheelPicker
          selectedIndicatorStyle={styles.selectedIndicator}
          itemHeight={44}
          containerStyle={styles.monthContainer}
          itemStyle={styles.monthItem}
          itemTextStyle={{ ...TEXT_VARIANTS.font24, ...styles.itemText }}
          selectedIndex={monthIndex}
          options={MONTHS}
          onChange={onMonthChange}
        />
        <WheelPicker
          itemHeight={44}
          selectedIndicatorStyle={styles.selectedIndicator}
          itemTextStyle={{ ...TEXT_VARIANTS.font24, ...styles.itemText }}
          containerStyle={styles.yearContainer}
          selectedIndex={yearIndex}
          options={YEARS}
          onChange={onYearChange}
        />
      </View>
      <View
        style={[
          styles.buttonContainer,
          { paddingBottom: bottom + GUTTER_SIZE * 3 },
        ]}
      >
        <Button onPress={handlePressSave} text={t('CONFIRM')} />
      </View>
    </View>
  );
};
