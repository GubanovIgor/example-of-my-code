import { UserProfile } from 'core/interfaces';
import { formatDate } from 'core/utils';
import { Profile_fragment$data } from 'queries/__generated__/Profile_fragment.graphql';

export const getNormalizedUserProfile: (
  data: Profile_fragment$data,
) => UserProfile = (data) => {
  const { userProfile } = data;
  return {
    id: userProfile?.profile?.internalId || '',
    firstName: userProfile?.profile?.firstName || '',
    lastName: userProfile?.profile?.firstName || '',
    birthday: formatDate(userProfile?.profile?.birthday),
    streetAddress: userProfile?.primaryAddress?.streetAddress || '',
    phoneNumber: Array.isArray(userProfile?.profile?.phoneNumbers)
      ? userProfile?.profile?.phoneNumbers[0]?.name
      : '',
    email: Array.isArray(userProfile?.emailAddresses)
      ? userProfile?.emailAddresses[0]
      : '',
  };
};
