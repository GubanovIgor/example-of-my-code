import { graphql } from 'react-relay';

export const ResultsQuery = graphql`
  query ResultsScreenQuery {
    gamingResult {
      played
      won
      loss
      deposit
      withdrawal
      netPossition
      cashNetPossition
      currency {
        internalId
        name
        shortSign
        symbol
      }
    }
  }
`;
