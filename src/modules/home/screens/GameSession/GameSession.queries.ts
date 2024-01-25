import { graphql } from 'react-relay';

export const GameQuery = graphql`
  query GameSessionScreenQuery(
    $id: ID!
    $isPaidMode: Boolean!
    $lang: String!
  ) {
    gameSession(id: $id, isPaidMode: $isPaidMode, lang: $lang) {
      id
      gameId
      loadInfo
    }
  }
`;

export const GamingShortResultsQuery = graphql`
  query GameSessionShortresultsQuery($from: DateTime!, $to: DateTime!) {
    gamingShortResult(from: $from, to: $to) {
      won
      lost
      currency {
        internalId
        name
        shortSign
        symbol
      }
    }
  }
`;
