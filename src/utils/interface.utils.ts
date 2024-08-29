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

export interface IMultisent {
  wallet: string;
  chainId: number;
  token: string;
  recipients: string[];
  amounts: number[];
  txhash: string;
  totalRecipients: number;
  totalAmount: number;
}

export interface ITokenLockModel {
  wallet: string;
  chainId: number;
  token: string;
  amount: number;
  withdrawlAddress: string;
  unlockTime: number;
  txhash: string;
  mintNft: boolean;
  referr: string;
}

export interface INFTLockModel {
  wallet: string;
  chainId: number;
  nftAddr: string;
  tokenId: number;
  withdrawlAddress: string;
  unlockTime: number;
  txhash: string;
  mintNft: boolean;
  referr: string;
}

export interface IStakeModel {
  wallet: string;
  chainId: number;
  amount: number;
  mainToken: string;
  pairToken: string;
  rate: number;
  rateDecimal: number;
  txhash: string;
  mainTokenFee: number;
  pairTokenFee: number;
}