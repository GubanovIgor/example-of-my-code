import { AccountType } from 'queries/__generated__/UserAccountsQuery.graphql';

export interface UserAccounts {
  balance: number;
  blockedAmount: number;
  creditLimit: number;
  currencyId: number;
  id: string;
  internalId: any;
  type: AccountType | null;
}
