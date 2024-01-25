import React from 'react';
import { useTranslation } from 'react-i18next';

import { TournamentPresenter } from './Tournament.presenter';

export const TournamentContainer = () => {
  const { t } = useTranslation();

  return <TournamentPresenter t={t} />;
};
