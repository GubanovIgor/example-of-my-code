import React from 'react';
import Bolivia from 'assets/icons/countriesFlags/bolivia.svg';

export const DEFAULT_PHONE_COUNTRY_VALUE = {
  id: 28,
  country: 'Bolivia',
  code: '+591',
  iso: 'BO',
  icon: <Bolivia />,
  mask: '999-999-99',
};
export const RESEND_CODE_DELAY = 4;
export const CODE_MASK = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

export const PHONE_INPUT_HELP_TEXT = 'SIGN_UP_SCHEMA.CODE_SEND_PHONE';
export const EMAIL_HELP_TEXT = 'WILL_BE_USED_AT_WITHDRAWAL';
