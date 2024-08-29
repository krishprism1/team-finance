import { IMultisent } from '@/utils/interface.utils';
import mongoose, { Document, Model, Schema } from 'mongoose';

interface IMultisentDocument extends IMultisent, Document { }

const multisentSchema: Schema<IMultisentDocument> = new Schema({
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
    recipients: {
      type: [String], 
      required: true,
    },
    amounts: {
      type: [Number],
      required: true,
    },
    txhash: {
      type: String,
      required: true,
    },
    totalRecipients: {
      type: Number, 
      required: true,
    },
    totalAmount: {
      type: Number, 
      required: true,
    },
  }, { timestamps: true }); 
  

const Multisent: Model<IMultisentDocument> = mongoose.models.Multisent || mongoose.model<IMultisentDocument>('Multisent', multisentSchema);

export default Multisent;
