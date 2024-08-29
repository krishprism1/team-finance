import { ITokenLockModel } from '@/utils/interface.utils';
import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITokenLockModelDocument extends ITokenLockModel, Document { }

const tokenLockSchema: Schema<ITokenLockModelDocument> = new Schema({
  wallet: {
    type: String,
    required: true,
  },
  chainId: {
    type: Number,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  withdrawlAddress: {
    type: String,
    required: true,
  },
  unlockTime: {
    type: Number,
    required: true,
  },
  txhash: {
    type: String,
    required: true,
  },
  mintNft: {
    type: Boolean,
    required: true
  },
  referr : {
    type: String,
    required: true
  }
}, { timestamps: true });

const TokenLocks: Model<ITokenLockModelDocument> = mongoose.models.TokenLocks || mongoose.model<ITokenLockModelDocument>('TokenLocks', tokenLockSchema);

export default TokenLocks;
