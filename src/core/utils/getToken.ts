import Config from 'react-native-config';

import { isIdentityReqError } from '../helpers';
import {
  IdentityErrorFormatted,
  IdentityResponse,
  IdentityResponseFormatted,
} from '../interfaces/identity';
import { fetcher } from './fetcher';

export default async function getToken(
  username: string,
  password: string,
  code?: string,
  userId?: string,
): Promise<IdentityResponseFormatted | IdentityErrorFormatted> {
  const reqData = {
    username,
    password,
    ...(code && {
      'confirmation-code': code,
      'user-id': userId,
    }),
    client_id: String(Config.IDENTITY_CLIENT_ID),
    client_secret: String(Config.IDENTITY_CLIENT_SECRET),
    scope: 'openid profile offline_access api-read api-write',
    grant_type: 'password',
  };

  if (username && password) {
    reqData.username = username;
    reqData.password = password;
  }

  const res = await fetcher(reqData);
  const result = (await res.json()) as IdentityResponse;

  if (!isIdentityReqError(result)) {
    return {
      ok: true,
      token: result.access_token,
      refreshToken: result.refresh_token,
    };
  }
  return { ok: false, error: result.error_description };
}
