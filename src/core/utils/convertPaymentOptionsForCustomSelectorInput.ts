import { CustomPickerValue } from 'core/interfaces';

export const convertPaymentOptionsForCustomPicker = (
  options: ReadonlyArray<{
    readonly name: string | null;
    readonly optionId: string | null;
    readonly value: string | null;
  } | null> | null,
) => {
  if (!options) return [];
  const modifiedOptions: CustomPickerValue[] = options?.map((option) => ({
    id: option?.optionId || '',
    value: option?.name || '',
  }));
  return modifiedOptions;
};
