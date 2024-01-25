import { VoidFunction } from 'core/interfaces';
import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';

import { LoadingView } from '../LoadingView';
import { MaintenanceInfo, VersionUpdateInfo } from './childComponents';
import { useMaintenanceUpdateStatus } from './hooks/useMaintenanceUpdateStatus';
import { styles } from './MaintenanceUpdateWrapper.styles';
import { IMaintenance, IVersion } from './MaintenanceUpdateWrapper.types';

interface Props {
  children: ReactNode;
}

export interface GetContentRendererParams {
  isLoading: boolean;
  isWrapperShown: boolean;
  versionInfo?: IVersion;
  maintenanceInfo?: IMaintenance;
  onPressUpdate: VoidFunction;
  onPressClose: VoidFunction;
}

export const getContentRenderer = ({
  isLoading,
  isWrapperShown,
  versionInfo,
  maintenanceInfo,
  onPressClose,
  onPressUpdate,
}: GetContentRendererParams) => {
  if (isLoading)
    return <LoadingView containerStyles={styles.loaderContainer} />;

  if (!isWrapperShown) return null;

  return (
    <View style={styles.container}>
      {maintenanceInfo?.isEnabled ? (
        <MaintenanceInfo info={maintenanceInfo} />
      ) : (
        <VersionUpdateInfo
          onUpdate={onPressUpdate}
          onClose={onPressClose}
          info={versionInfo}
        />
      )}
    </View>
  );
};

export const MaintenanceUpdateWrapper: FC<Props> = ({ children }) => {
  const {
    versionInfo,
    maintenanceInfo,
    isWrapperShown,
    isLoading,
    handleOnPressLater,
    handleOnUpdateApp,
  } = useMaintenanceUpdateStatus();

  const renderContent = getContentRenderer({
    isLoading,
    isWrapperShown,
    versionInfo,
    maintenanceInfo,
    onPressUpdate: handleOnUpdateApp,
    onPressClose: handleOnPressLater,
  });

  return (
    <>
      {children}
      {renderContent}
    </>
  );
};
