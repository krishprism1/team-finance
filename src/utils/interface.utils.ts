export interface IToken {
    wallet: string;
    name: string;
    symbol: string;
    decimal: number;
    supply: number;
    description: string;
    tokenLogo: string;
    website: string;
    twitter: string;
    telegram: string;
    mintable: boolean;
    burnable: boolean;
    createdAt: Date;
  }

  export type ITokenForm = Omit<IToken, 'createdAt'>;