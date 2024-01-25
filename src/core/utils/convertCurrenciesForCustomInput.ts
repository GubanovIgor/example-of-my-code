import { Item } from 'modules/common/screens/SelectorModal/SelectorModal.types';

import { CurrencyOption } from 'constants/CURRENCIES';

export const convertCurrenciesForCustomInputSelector = (
  currencies: CurrencyOption[],
) => {
  const currenciesArray = currencies.map(
    (currency) => `${currency.cc} ${currency.name}`,
  );

  const currenciesSeparatedBySections: {
    [key: string]: string[];
  } = {};

  currenciesArray.forEach((currency) => {
    if (currenciesSeparatedBySections[currency[0]]) {
      currenciesSeparatedBySections[currency[0]].push(currency);
    } else {
      currenciesSeparatedBySections[currency[0]] = [];
      currenciesSeparatedBySections[currency[0]].push(currency);
    }
  });

  const result: Item[] = [];

  Object.keys(currenciesSeparatedBySections).forEach((sectionKey) => {
    result.push({
      title: sectionKey,
      data: currenciesSeparatedBySections[sectionKey],
    });
  });

  return result;
};
