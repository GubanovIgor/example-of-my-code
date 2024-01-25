import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from 'core/interfaces/navigation';
import * as React from 'react';

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}
