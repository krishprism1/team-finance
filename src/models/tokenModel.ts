// models/tokenModel.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

interface IToken extends Document {
  wallet:string;
  name: string;
  symbol: string;
  decimal: number;
  supply: number;
  description: string;
  tokenLogo : string;
  website: string;
  twitter: string;
  telegram: string;
  createdAt: Date;
}

const tokenSchema: Schema<IToken> = new mongoose.Schema({
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

const Token: Model<IToken> = mongoose.models.Token || mongoose.model<IToken>('Token', tokenSchema);

export default Token;
