export interface SelfLimitTrio {
  perDay: SelfLimitItem;
  perWeek: SelfLimitItem;
  perMonth: SelfLimitItem;
}

export interface SelfLimitItem {
  currentLimit: number | null;
  used: number;
  nextPossibleIncreasing: string;
}

export interface SelfLimits {
  stakeLimits?: SelfLimitTrio;
  lossLimits?: SelfLimitTrio;
  depositLimits?: SelfLimitTrio;
  maxSessionTimeLimit?: SelfLimitItem;
}
