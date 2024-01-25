import { zodResolver } from '@hookform/resolvers/zod';
import { GetTranslationValue } from 'core/interfaces';
import { z } from 'zod';

const getCodeValidation = (t: GetTranslationValue) =>
  z
    .string()
    .min(8, t('LOGIN_SCHEMA.PASSWORD_MIN'))
    .regex(/^[0-9]+$/, t('CODE_HAVE_NUMBERS_ONLY'));

export const getFormResolver = (
  isCodeAvailable: boolean,
  t: GetTranslationValue,
) => {
  const zObject = {
    phone: z
      .string()
      .min(3, t('REQUIRED'))
      .regex(/^[+]? *[0-9][0-9 ]*$/, t('PHONE_NUMBER_NOT_VALID')),
  };

  if (isCodeAvailable) {
    Object.assign(zObject, { code: getCodeValidation(t) });
  }
  return zodResolver(z.object(zObject));
};
