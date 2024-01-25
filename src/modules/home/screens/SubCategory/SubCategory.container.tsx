import React from 'react';
import { RootStackScreenProps } from 'core/interfaces/navigation';

import { PATHS } from 'constants/PATHS';

import { SubCategoryPresenter } from './SubCategory.presenter';

export const SubCategoryContainer = ({
  route,
}: RootStackScreenProps<PATHS.SUB_CATEGORY>) => {
  const { title } = route?.params?.subCategoryData || {};

  return <SubCategoryPresenter title={title} />;
};
