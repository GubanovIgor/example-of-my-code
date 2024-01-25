import { zodResolver } from '@hookform/resolvers/zod';
import { GetTranslationValue } from 'core/interfaces';
import { z } from 'zod';

export const getFormResolver = (t: GetTranslationValue) =>
  zodResolver(
    z
      .object({
        password: z
          .string()
          .min(8, t('LOGIN_SCHEMA.PASSWORD_MIN'))
          .regex(/[a-z]/, t('LOGIN.PASSWORD_CONTAIN_ONE_LETTER'))
          .regex(/[0-9]/, t('LOGIN.PASSWORD_CONTAIN_ONE_NUMBER')),
        repeatPassword: z
          .string()
          .min(8, t('LOGIN_SCHEMA.PASSWORD_MIN'))
          .regex(/[a-z]/, t('LOGIN.PASSWORD_CONTAIN_ONE_LETTER'))
          .regex(/[0-9]/, t('LOGIN.PASSWORD_CONTAIN_ONE_NUMBER')),
      })
      .refine((data) => data.password === data.repeatPassword, {
        message: t('PASSWORD_RECOVERY.PASSWORD_NO_MATCH'),
        path: ['repeatPassword'],
      }),
  );
