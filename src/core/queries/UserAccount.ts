import { graphql } from 'react-relay';

export const UserAccountQuery = graphql`
  query UserAccountQuery {
    ...BalanceDisplay_fragment
    userProfile {
      externalKycVerificationStatus
      userPaymentSettings {
        allowedOperationTypes
        id
      }
    }
  }
`;
