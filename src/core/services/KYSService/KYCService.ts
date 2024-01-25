import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module';
import { VoidFunction } from 'core/interfaces';
import { KYCServiceTokenQuery } from 'queries/__generated__/KYCServiceTokenQuery.graphql';
import { fetchQuery } from 'relay-runtime';
import { getClientEnvironment } from 'relay/index';

import { GetKYSServiceTokenQuery } from './KYCService.queries';

interface InitProps {
  setLoading?: (value: boolean) => void;
  onSuccess?: VoidFunction;
  onError?: VoidFunction;
}

export const KYSService = {
  getToken: async () =>
    await fetchQuery<KYCServiceTokenQuery>(
      getClientEnvironment(),
      GetKYSServiceTokenQuery,
      {},
    )
      .toPromise()
      .then((res) => res?.sumsubToken || '')
      .catch(() => ''),

  init: async function ({ setLoading, onSuccess, onError }: InitProps) {
    const accessToken = await this.getToken();
    let snsMobileSDK = SNSMobileSDK.init(
      accessToken,
      async () =>
        //Callback when tokens gets expired, so we request new one
        await this.getToken(),
    )
      .withHandlers({
        onActionResult: (result) => {
          // eslint-disable-next-line no-console
          return Promise.resolve('continue');
        },
      })
      .withDebug(__DEV__)
      .withLocale('en') // Optional, for cases when you need to override the system locale
      .build();

    snsMobileSDK
      .launch()
      .then((result) => {
        onSuccess && onSuccess();
        // eslint-disable-next-line no-console
      })
      .catch((err) => {
        onError && onError();
        // eslint-disable-next-line no-console
      })
      .finally(() => {
        setLoading && setLoading(false);
      });
  },
};
