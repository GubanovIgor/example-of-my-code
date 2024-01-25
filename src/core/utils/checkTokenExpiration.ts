import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';

export const checkTokenExpiration = (token: string) => {
  if (!token) return;
  const expire = jwtDecode<{ exp: number }>(token);
  const expirationDate = dayjs(expire.exp * 1000).subtract(5, 'minute');

  const diff = dayjs().diff(expirationDate, 'second', true);

  return diff >= 0;
};
