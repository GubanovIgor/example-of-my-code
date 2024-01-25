import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { PhoneOption } from 'core/interfaces/phoneOption';
import { GetTranslationValue } from 'core/interfaces';

export interface SignUpConfirmationForm {
  verifyCode: string;
  phone: string;
}

export interface SignUpConfirmationPresenterProps {
  onChangeCountry: (value: PhoneOption) => void;
  onChangeVerifyCode: Dispatch<SetStateAction<string | undefined>>;
  verifyCode?: string;
  onPressLogin: () => void;
  onPressResendCode: () => void;
  timeLeft: number;
  isPhoneEditable: boolean;
  t: GetTranslationValue;
  onSavePhone: SubmitHandler<SignUpConfirmationForm>;
  onEditPhone: () => void;
  isLoading: boolean;
  formMethods: UseFormReturn<SignUpConfirmationForm, any>;
  initialPhoneCode?: PhoneOption;
  phoneNumber?: string;
}
