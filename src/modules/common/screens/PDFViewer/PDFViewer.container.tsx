import { BottomSheetWrapper } from 'components/BottomSheetWrapper';
import React, { FC } from 'react';
import { RootStackScreenProps } from 'core/interfaces/navigation';

import { PATHS } from 'constants/PATHS';

import { PDFViewerPresenter } from './PDFViewer.presenter';

export const PDFViewerContainer: FC<RootStackScreenProps<PATHS.PDF_VIEWER>> = ({
  route,
}) => {
  const { source } = route.params;

  return (
    <BottomSheetWrapper screenKey={PATHS.PDF_VIEWER}>
      <PDFViewerPresenter source={source} />
    </BottomSheetWrapper>
  );
};
