export interface GamingResults {
  readonly cashNetPossition: any | null;
  readonly currency: {
    readonly internalId: any;
    readonly name: string | null;
    readonly shortSign: string | null;
    readonly symbol: string | null;
  } | null;
  readonly deposit: any | null;
  readonly loss: any | null;
  readonly netPossition: any | null;
  readonly played: any | null;
  readonly withdrawal: any | null;
  readonly won: any | null;
}
