import { graphql } from 'react-relay';

export const TransactionsQuery = graphql`
  query TransactionHistoryScreenItemsQuery {
    userCurrency {
      internalId
      name
      shortSign
      symbol
    }
    ...TransactionHistoryScreenItemsFragment
  }
`;

export const TransactionItemFragment = graphql`
  fragment TransactionHistoryItem_fragment on UserPaymentTransactionItem {
    id
    internalId
    currencyId
    amount
    state
    paymentTransactionType
    providerName
    createdDate
    changedDate
    text
    handlerId
    referenceID
  }
`;

export const TransactionHistoryScreenPaginationQuery = graphql`
  fragment TransactionHistoryScreenItemsFragment on Query
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 14 }
    after: { type: "String" }
  )
  @refetchable(queryName: "TransactionListPaginationQuery") {
    paymentsHistory(first: $first, after: $after)
      @connection(key: "TransactionsScreenItemsFragment__paymentsHistory") {
      edges {
        cursor
        node {
          ...TransactionHistoryItem_fragment
        }
      }
    }
  }
`;
