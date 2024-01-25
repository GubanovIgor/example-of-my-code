export interface MultipleLimitsValue {
  perDay?: string | null;
  perWeek?: string | null;
  perMonth?: string | null;
}

export interface MaxSessionValue {
  maxSessionTime?: string | null;
}

export type LimitsFormValues = MultipleLimitsValue & MaxSessionValue;
