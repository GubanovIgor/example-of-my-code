import React from 'react';
import { useTranslation } from 'react-i18next';

import { AboutCompanyPresenter } from './AboutCompany.presenter';

export const AboutCompanyContainer = () => {
  const { t } = useTranslation();

  return <AboutCompanyPresenter title={t('ABOUT_SCREEN.TITLE')} />;
};
