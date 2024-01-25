import { graphql } from 'react-relay';

export const BranchSettingsQuery = graphql`
  query BranchSettingsQuery {
    branchSettings {
      currencies {
        name
        id
        internalId
        symbol
        shortSign
      }
      countries {
        name
        shortSign
        internalId
      }
    }
  }
`;
