import React, { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Modalize } from 'react-native-modalize';
import { useAuthStore } from 'store/authStore';
import { useLocalisationStore } from 'store/localisationStore';

import { MenuPresenter } from './Menu.presenter';

export const MenuContainer: FC = ({}) => {
  const { t } = useTranslation();

  const { isAuth } = useAuthStore((s) => ({
    isAuth: Boolean(s.loginState.accessToken),
  }));

  const { currentLanguage } = useLocalisationStore();

  const languagesSelectorRef = useRef<Modalize>(null);

  const onPressShowLanguages = () => {
    languagesSelectorRef?.current?.open();
  };

  return (
    <MenuPresenter
      isAuth={isAuth}
      currentLanguage={currentLanguage}
      languagesSelectorRef={languagesSelectorRef}
      onPressShowLanguages={onPressShowLanguages}
      t={t}
    />
  );
};
