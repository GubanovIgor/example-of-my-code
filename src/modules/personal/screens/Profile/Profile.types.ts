import { LazyLoadQueryOptions, VoidFunction } from 'core/interfaces';
import { Profile_fragment$key } from 'queries/__generated__/Profile_fragment.graphql';

export interface ProfilePresenterProps {
  personalInformationRef: Profile_fragment$key;
  onPressSupport: VoidFunction;
  onPressChangePasword: VoidFunction;
  onPressVerification: VoidFunction;
}
export interface ProfileContainerProps {
  queryOptions?: LazyLoadQueryOptions;
}
