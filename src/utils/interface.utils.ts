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
  symbol: string;
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
  mainToken: string;
  rewardToken: string;
  startTime: number;
  endTime: number;
  decimals: number;
  txhash: string;
  totalReward: number;
}



//Components related interface

export interface TokenInfo {
  token: string;
  name: string;
  symbol: string;
  balance: number;
  decimals:number;
}

//stake page
export interface stakeFormInfo {
  rewardToken : string;
  startTime: number;
  endTime: number;
  precision: number;
  totalReward: number;
}

//vesting form data
export interface VestingFormData {
  walletAddress: string;
  walletNickname: string;
  relationship: string;
  numberOfTokens: number;
  vestingCadence: string;
  startDate: string;
  endDate: string;
  cliffLength: number;
  releasePercentage: number;
}

//validationi
export interface ValidationErrors {
  [key: string]: string;
}