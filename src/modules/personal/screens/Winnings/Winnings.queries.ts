import { graphql } from 'react-relay';

export const WinningsQuery = graphql`
  query WinningsScreenItemsQuery {
    ...WinningsScreenItemsFragment
  }
`;

export const WinningsScreenPaginationQuery = graphql`
  fragment WinningsScreenItemsFragment on Query
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "String" }
  )
  @refetchable(queryName: "WinningsPaginationQuery") {
    winningHistoryCursor(first: $first, after: $after)
      @connection(key: "WinningsScreenItemsFragment__winningHistoryCursor") {
      edges {
        cursor
        node {
          ...WinningsListItem_fragment
        }
      }
    }
  }
`;
