import { GetTranslationValue } from 'core/interfaces';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

export interface PasswordRecoveryPresenterProps {
  formMethods: UseFormReturn<PasswordRecoveryForm, any>;
  onSubmitHandler: SubmitHandler<PasswordRecoveryForm>;
  onPhoneFocus: () => void;
  onPressResendCode: () => void;
  t: GetTranslationValue;
  isLoaderShown: boolean;
  timeLeft: number;
  isCodeInputAvailable: boolean;
}
export interface PasswordRecoveryForm {
  phone: string;
  code: string;
}
