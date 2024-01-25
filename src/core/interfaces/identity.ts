export interface IsError {
  error: string;
  error_description: string;
}

export type IdentityResponse =
  | {
      access_token: string;
      expires_in: number;
      refresh_token: string;
    }
  | IsError;

export interface IdentityResponseFormatted {
  ok: true;
  token: string;
  refreshToken: string;
}

export interface IdentityErrorFormatted {
  ok: false;
  error: string;
}
