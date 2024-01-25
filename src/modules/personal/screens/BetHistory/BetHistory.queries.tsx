import { graphql } from 'react-relay';

export const BetHistoryQuery = graphql`
  query BetHistoryScreenItemsQuery {
    ...BetHistoryScreenItemsFragment
  }
`;

export const BetHistoryScreenPaginationQuery = graphql`
  fragment BetHistoryScreenItemsFragment on Query
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "String" }
  )
  @refetchable(queryName: "BetHistoryPaginationQuery") {
    gamingHistoryCursor(first: $first, after: $after)
      @connection(key: "BetHistoryScreenItemsFragment__gamingHistoryCursor") {
      edges {
        cursor
        node {
          ...BetHistoryListItem_fragment
        }
      }
    }
  }
`;
