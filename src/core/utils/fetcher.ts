import Config from 'react-native-config';

interface ReqData {
  [key: string]: string | number;
}

const urlEncodedParams = (params: ReqData): string =>
  Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');

export const fetcher = async (params: ReqData): Promise<Response> =>
  await fetch(String(Config.IDENTITY_API_URL), {
    method: 'POST',
    body: urlEncodedParams(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
