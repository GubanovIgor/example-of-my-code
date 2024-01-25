import React from 'react';
import { useTranslation } from 'react-i18next';

import { FAQPresenter } from './FAQ.presenter';

export const FAQContainer = () => {
  const { t } = useTranslation();

  return <FAQPresenter title={t('FOOTER.FAQ')} />;
};
