import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTimer } from 'core/hooks';
import { useTranslation } from 'react-i18next';
import { convertTime } from 'core/utils/convertTime';
import dayjs from 'dayjs';

import { styles } from './BonusTimer.styles';
import { TimerSection } from './subComponents/TimerSection';
import { TimerColon } from './subComponents/TimerColon';

interface Props {
  expireDate: string;
}

export const BonusTimer = ({ expireDate }: Props) => {
  const { timeLeft, startTimer } = useTimer(dayjs(expireDate).valueOf() / 1000);
  const convertedTimeLeft = convertTime(timeLeft);

  const { t } = useTranslation();

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  // TODO: Add i18n for text prop
  return (
    <View style={styles.container}>
      <View style={styles.sections}>
        <TimerSection time={convertedTimeLeft.days} text="Days" />
        <TimerColon />
        <TimerSection time={convertedTimeLeft.hours} text="Hours" />
        <TimerColon />
        <TimerSection time={convertedTimeLeft.minutes} text="Minutes" />
      </View>
    </View>
  );
};
