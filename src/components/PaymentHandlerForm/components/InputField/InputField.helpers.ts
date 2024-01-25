const MIN_SUM = 50;

import { HookFormValidation } from 'core/interfaces/formsValidation';

export const convertValidationRules = (
  validationRules: any,
): HookFormValidation => {
  const convertedValidationRules = validationRules?.reduce(
    (obj: { pattern?: { message: string; value: string } }, rule: any) => {
      switch (rule?.__typename) {
        case 'LengthValidationRule':
          return {
            minLength: {
              value: rule.minLength,
              message: `Minimum length is ${rule.minLength ?? ''}!`,
            },
            maxLength: {
              value: rule.maxLength,
              message: `Maximum length is ${rule.maxLength ?? ''}!`,
            },
            ...obj,
          };
        case 'RangeValidationRule':
          return {
            pattern: {
              value: /^[1-9]+[0-9]*$/,
              message: 'Please enter valid number',
            },
            min: {
              value: rule.minValue,
              message: `Min amount is ${rule.minValue}`,
            },
            max: {
              value: rule.maxValue,
              message: `Max amount is ${rule.maxValue}`,
            },
            ...obj,
          };
        case 'RegexValidationRule':
          return {
            pattern: { value: rule.pattern, message: rule.message },
            ...obj,
          };
        case 'MaskValidationRule':
          return {
            mask: rule.mask,
            ...obj,
          };
        default:
          return obj;
      }
    },
    {},
  );

  return convertedValidationRules;
};

export const getCustomValue = (minSum?: number, balance?: number) => {
  if (!minSum) return;

  return !balance && balance !== 0 && minSum <= MIN_SUM
    ? String(MIN_SUM)
    : undefined;
};

export const getParentValue = (parent: { value: string } | null) => {
  if (parent?.value) return parent.value;

  return parent;
};
