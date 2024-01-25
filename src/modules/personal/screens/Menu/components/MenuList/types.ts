import { ReactNode } from 'react';

import { PATHS } from 'constants/PATHS';

export interface MenuItem {
  title: string;
  icon: () => ReactNode;
  name: PATHS;
  navigationOptions?: Record<string, any>;
}
