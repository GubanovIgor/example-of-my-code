import Config from 'react-native-config';

import { isIdentityReqError } from '../helpers';
import { IdentityResponse } from '../interfaces/identity';
import { fetcher } from './fetcher';

export const refreshToken = async (token: string) => {
  const reqData = {
    client_id: String(Config.IDENTITY_CLIENT_ID),
    client_secret: String(Config.IDENTITY_CLIENT_SECRET),
    grant_type: 'refresh_token',
    refresh_token: token,
  };
  const res = await fetcher(reqData);
  const result = (await res.json()) as IdentityResponse;
  if (!isIdentityReqError(result)) {
    return {
      accessToken: result.access_token,
      expires: result.expires_in,
      refreshToken: result.refresh_token,
    };
  } else {
    throw new Error(result.error_description);
  }
};
