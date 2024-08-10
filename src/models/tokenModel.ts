// models/tokenModel.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

interface IToken extends Document {
  name: string;
  symbol: string;
  decimal: number;
  supply: number;
  createdAt: Date;
}

const tokenSchema: Schema<IToken> = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Token: Model<IToken> = mongoose.models.Token || mongoose.model<IToken>('Token', tokenSchema);

export default Token;
