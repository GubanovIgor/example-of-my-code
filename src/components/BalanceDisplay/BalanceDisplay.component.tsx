import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { graphql, useFragment, useRelayEnvironment } from 'react-relay';
import { TEXT_VARIANTS } from 'config/theme';
import { useUserStore } from 'store/userStore';
import { shallow } from 'zustand/shallow';
import { fetchQuery, Subscription } from 'relay-runtime';
import {
  BalanceDisplayQuery,
  BalanceDisplayQuery$data,
} from 'queries/__generated__/BalanceDisplayQuery.graphql';
import { BalanceDisplay_fragment$key } from 'queries/__generated__/BalanceDisplay_fragment.graphql';
import { getCurrencyWithAmount } from 'core/helpers';

import { PATHS } from 'constants/PATHS';

import { styles } from './BalanceDisplay.styles';

interface Props {
  type?: 'header' | 'withdrawal' | 'menu';
  title?: string;
  loaderStyles?: StyleProp<ViewStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
}

const query = graphql`
  query BalanceDisplayQuery {
    ...BalanceDisplay_fragment
  }
`;

export const fragment = graphql`
  fragment BalanceDisplay_fragment on Query {
    userAccount(type: MAIN) {
      id
      balance
      blockedAmount
      currency {
        id
        shortSign
        symbol
      }
    }
  }
`;

const TWO_MINUTES = 120000;
const TEN_SECONDS = 10000;

export const BalanceDisplay: FC<Props> = ({
  title,
  type = 'header',
  containerStyles,
  loaderStyles,
  textStyles,
}) => {
  // for reusing across routes
  const cachedRef = useRef<BalanceDisplayQuery$data | null>(null);
  const [retries, setRetries] = useState(0);
  const [itemRef, setItemRef] = useState<BalanceDisplay_fragment$key | null>(
    cachedRef.current,
  );
  const env = useRelayEnvironment();
  const cachedSubscription = useRef<Subscription | null>(null);
  const { setBalance, routeName } = useUserStore((s) => s);
  const { balance, currency } =
    useFragment(fragment, itemRef)?.userAccount || {};

  const pollTimeout = useMemo(
    () => (routeName === PATHS.GAME_SESSION ? TEN_SECONDS : TWO_MINUTES),
    [routeName],
  );

  const subscribe = (): Subscription =>
    fetchQuery<BalanceDisplayQuery>(
      env,
      query,
      {},
      {
        fetchPolicy: 'network-only',
        networkCacheConfig: {
          poll: pollTimeout,
          force: false,
        },
      },
    ).subscribe({
      next: (data) => {
        setItemRef(data);
        setRetries(0);
        cachedRef.current = data;
      },
      error: () => {
        if (retries > 5) return;
        // implicitly rerender
        setRetries((r) => r + 1);
      },
    });

  const { currencyShortSign, setUserDetails } = useUserStore(
    (state) => ({
      currencyShortSign: state.userDetails?.currencyDisplayShortSign,
      setUserDetails: state.setUserDetails,
    }),
    shallow,
  );

  useEffect(() => {
    if (retries > 0) {
      cachedSubscription.current?.unsubscribe();
      requestAnimationFrame(() => {
        cachedSubscription.current = subscribe();
      });
    }
    if (!cachedSubscription.current) {
      cachedSubscription.current = subscribe();
    }

    return cachedSubscription.current?.unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retries]);

  useEffect(() => {
    if (currency?.shortSign && !currencyShortSign) {
      setUserDetails({ currencyDisplayShortSign: currency?.shortSign });
    }

    setBalance(balance);
  }, [
    balance,
    currency?.shortSign,
    currencyShortSign,
    setBalance,
    setUserDetails,
  ]);

  const balanceText = getCurrencyWithAmount({
    shortSign: currencyShortSign,
    symbol: currency?.symbol,
    amount: balance?.toString(),
  });

  if (!currency)
    return (
      <ActivityIndicator
        style={[loaderStyles, type === 'header' && styles.loader]}
      />
    );

  return (
    <View style={containerStyles}>
      {Boolean(title) && (
        <Text style={[TEXT_VARIANTS.font14, styles.title]}>{title}</Text>
      )}
      <Text
        style={[
          TEXT_VARIANTS[type === 'header' ? 'font14' : 'font24Bold'],
          styles[type === 'header' ? 'headerText' : 'withdrawalText'],
          textStyles,
        ]}
      >
        {balanceText}
      </Text>
    </View>
  );
};
