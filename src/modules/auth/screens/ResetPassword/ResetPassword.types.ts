import { GetTranslationValue } from 'core/interfaces';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

export interface ResetPasswordPresenterProps {
  formMethods: UseFormReturn<ResetPasswordForm, any>;
  isLoading: boolean;
  onSubmitHandler: SubmitHandler<ResetPasswordForm>;
  t: GetTranslationValue;
}
export interface ResetPasswordForm {
  password: string;
  repeatPassword: string;
}
