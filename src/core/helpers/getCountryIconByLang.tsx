import React from 'react';
import EnglandFlagIcon from 'assets/icons/countriesFlags/united-kingdom.svg';
import PortugalFlagIcon from 'assets/icons/countriesFlags/portugal.svg';

//Temporarily. When backend will be ready for localisation, then we will get flags from backend
export const getCountryIconByLang = (lang: string) => {
  switch (lang) {
    case 'en':
      return <EnglandFlagIcon height={22} width={22} />;
    case 'pt':
      return <PortugalFlagIcon height={22} width={22} />;

    default:
      return null;
  }
};
