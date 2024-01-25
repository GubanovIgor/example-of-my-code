import { graphql } from 'react-relay';

export const AuthStoreQuery = graphql`
  query AuthStoreQuery {
    paymentTransactions {
      items {
        id
      }
    }
  }
`;
