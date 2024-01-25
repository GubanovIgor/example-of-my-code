import React from 'react';
import { useTranslation } from 'react-i18next';

import { SupportPresenter } from './Support.presenter';

export const SupportContainer = () => {
  const { t } = useTranslation();

  return <SupportPresenter title={t('SUPPORT_SCREEN.TITLE')} />;
};
