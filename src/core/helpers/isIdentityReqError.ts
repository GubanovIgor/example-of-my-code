import { IdentityResponse, IsError } from '../interfaces/identity';

export const isIdentityReqError = (obj: IdentityResponse): obj is IsError =>
  'error' in obj;
