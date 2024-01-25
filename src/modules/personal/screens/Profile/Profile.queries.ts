import { graphql } from 'react-relay';

export const ProfileInformationQuery = graphql`
  query ProfileScreenQuery {
    ...Profile_fragment
  }
`;

export const ProfileFragment = graphql`
  fragment Profile_fragment on Query {
    userProfile {
      id
      internalId
      profile {
        id
        internalId
        title
        gender
        firstName
        lastName
        birthday
        phoneNumbers {
          name
        }
      }
      primaryAddress {
        countryId
        streetAddress
      }
      emailAddresses
    }
  }
`;
