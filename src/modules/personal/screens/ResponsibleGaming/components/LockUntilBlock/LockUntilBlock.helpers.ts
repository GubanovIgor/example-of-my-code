import { LockDurationEnum } from 'core/enums/selfLimits';
import { GetTranslationValue } from 'core/interfaces';
import dayjs from 'dayjs';

export const getPeriods = (t: GetTranslationValue) => [
  { id: LockDurationEnum.ONE_MONTH, value: t('MONTH', { count: 1 }) },
  {
    id: LockDurationEnum.THREE_MONTH,
    value: t('MONTHS', { count: 3 }),
  },
  { id: LockDurationEnum.SIX_MONTH, value: t('MONTHS', { count: 6 }) },
  {
    id: LockDurationEnum.TWELVE_MONTH,
    value: t('MONTHS', { count: 12 }),
  },
];

export const lockDurationValues = {
  [LockDurationEnum.ONE_MONTH]: { unit: 'month', value: 1 },
  [LockDurationEnum.THREE_MONTH]: { unit: 'month', value: 3 },
  [LockDurationEnum.SIX_MONTH]: { unit: 'month', value: 6 },
  [LockDurationEnum.TWELVE_MONTH]: { unit: 'month', value: 12 },
  [LockDurationEnum.PERMANENTLY]: { unit: 'month', value: 12 },
} as const;

export const getLockUntilDate = (lockDuration: LockDurationEnum): string => {
  const durationValue = lockDurationValues[lockDuration];

  return dayjs()
    .add(durationValue.value, durationValue.unit)
    .format('DD.MM.YYYY');
};
