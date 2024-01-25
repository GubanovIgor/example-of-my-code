import { GetTranslationValue, VoidFunction } from 'core/interfaces';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

export interface SignInPresenterProps {
  formMethods: UseFormReturn<SignInForm, any>;
  onSubmitHandler: SubmitHandler<SignInForm>;
  handlePressRecoveryPassword: VoidFunction;
  handlePressSignUp: VoidFunction;
  t: GetTranslationValue;
  isLoading: boolean;
}
export interface SignInForm {
  username: string;
  password: string;
}
