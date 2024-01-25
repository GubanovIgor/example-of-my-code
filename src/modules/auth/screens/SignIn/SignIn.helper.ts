import { zodResolver } from '@hookform/resolvers/zod';
import { GetTranslationValue } from 'core/interfaces';
import { z } from 'zod';

export const getFormResolver = (t: GetTranslationValue) =>
  zodResolver(
    z.object({
      username: z
        .string()
        .min(2, t('THIS_FIELD_REQUIRED'))
        .email()
        .or(
          z
            .string()
            .min(2, t('THIS_FIELD_REQUIRED'))
            .regex(/^[+]? *[0-9][0-9 ]*$/, t('PHONE_NUMBER_NOT_VALID')),
        ),
      password: z
        .string()
        .min(8, t('LOGIN_SCHEMA.PASSWORD_MIN'))
        .regex(/[0-9]/, t('LOGIN_SCHEMA.PASSWORD_CONTAIN_ONE_NUMBER')),
    }),
  );
