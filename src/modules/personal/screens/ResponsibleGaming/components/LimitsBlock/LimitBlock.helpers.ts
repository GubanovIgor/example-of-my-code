import { SelfLimitItem, SelfLimitTrio } from '../../ResponsibleGaming.types';
import { LimitsFormValues } from './LimitBlock.types';

export const getLimitFormDefaultValues = (limits?: SelfLimitTrio) => ({
  perDay: limits?.perDay?.currentLimit?.toString(),
  perWeek: limits?.perWeek?.currentLimit?.toString(),
  perMonth: limits?.perMonth?.currentLimit?.toString(),
});

export const getIsSaveAvailable = (
  values: LimitsFormValues,
  isDirty: boolean,
  limits?: SelfLimitTrio,
) => {
  let isAvailableByForm =
    Object.values(values).some((value) => Boolean(value)) && isDirty;

  if (limits) {
    const noNextPossibleIncreasing = Object.values(limits).some(
      (limit: SelfLimitItem) => !limit.nextPossibleIncreasing,
    );

    return isAvailableByForm && noNextPossibleIncreasing;
  }

  return isAvailableByForm;
};
