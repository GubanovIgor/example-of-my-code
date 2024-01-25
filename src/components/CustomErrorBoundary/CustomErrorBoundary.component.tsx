import React, { FC, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from 'react-native-error-boundary';

import { ErrorView } from '../ErrorView';

interface ICustomErrorBoundaryProps {
  children: ReactNode;
  hideButton?: boolean;
  onRefresh: () => void;
}
export const CustomErrorBoundary: FC<ICustomErrorBoundaryProps> = ({
  hideButton = false,
  children,
  onRefresh,
}) => {
  const { t } = useTranslation();

  const handlePressRefresh = useCallback(
    (resetError: () => void) => () => {
      resetError();
      onRefresh();
    },
    [onRefresh],
  );

  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetError }) => (
        <ErrorView
          hideButton={hideButton}
          errorMsg={error?.message}
          onRefresh={handlePressRefresh(resetError)}
          t={t}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
