import { openLink } from 'core/utils';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalisationStore } from 'store/localisationStore';

import { getDocs } from './Documents.helpers';
import { DocumentsPresenter } from './Documents.presenter';

export const DocumentsContainer: FC = ({}) => {
  const { t } = useTranslation();

  const { currentLanguage } = useLocalisationStore();

  const getDocPressHandler = useCallback(
    (link: string) => () => {
      openLink(link);
    },
    [],
  );

  const docs = getDocs(currentLanguage.key);

  return (
    <DocumentsPresenter
      t={t}
      docs={docs}
      getDocPressHandler={getDocPressHandler}
    />
  );
};
