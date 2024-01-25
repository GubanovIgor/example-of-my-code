interface Params {
  shortSign?: string | null;
  symbol?: string | null;
  amount?: string | null;
}

export const getCurrencyWithAmount = ({ shortSign, symbol, amount }: Params) =>
  `${shortSign || ''}${symbol ? `${symbol}` : ''} ${amount || '0'}`;
