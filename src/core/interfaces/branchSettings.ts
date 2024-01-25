export interface BranchSettings {
  currencies: Currency[];
  countries?: Country[];
}

export interface Currency {
  id: string;
  internalId: number;
  name: string;
  shortSign: string | null;
}

export interface Country {
  name: string;
  internalId: number;
  shortSign: string;
}
