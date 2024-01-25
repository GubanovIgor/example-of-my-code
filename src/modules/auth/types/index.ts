import { PhoneOption } from 'core/interfaces/phoneOption';

export type PhoneCountryValue = Pick<PhoneOption, 'code' | 'country' | 'mask'>;
