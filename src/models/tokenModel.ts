import { IToken } from '@/utils/interface.utils';
import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITokenDocument extends IToken, Document { }

const tokenSchema: Schema<ITokenDocument> = new mongoose.Schema({
  wallet: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  decimal: {
    type: Number,
    required: true,
  },
  supply: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tokenLogo: {
    type: String,
  },
  website: {
    type: String,
  },
  twitter: {
    type: String,
  },
  telegram: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Token: Model<ITokenDocument> = mongoose.models.Token || mongoose.model<ITokenDocument>('Token', tokenSchema);

export default Token;
