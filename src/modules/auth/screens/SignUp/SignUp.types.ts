import {
  CustomPickerValue,
  GetTranslationValue,
  VoidFunction,
} from 'core/interfaces';
import { PhoneOption } from 'core/interfaces/phoneOption';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

export interface SignUpForm {
  name: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
  phone: string;
  dob: string;
  terms: boolean;
  currency: string;
}

export interface SignUpPresenterProps {
  initialSelectedPhone?: PhoneOption | null;
  formMethods: UseFormReturn<SignUpForm, any>;
  handlePressOnBirthDate: VoidFunction;
  onSubmitHandler: SubmitHandler<SignUpForm>;
  onChangeCountry: (value: PhoneOption) => void;
  isLoading: boolean;
  currency?: CustomPickerValue;
  openSelectorModal: () => void;
  t: GetTranslationValue;
}
