import { IStakeModel } from '@/utils/interface.utils';
import mongoose, { Document, Model, Schema } from 'mongoose';

interface IStakeModelDocument extends IStakeModel, Document { }

const poolSchema: Schema<IStakeModelDocument> = new mongoose.Schema({
    wallet: {
        type: String,
        required: true,
    },
    chainId: {
        type: Number,
        required: true,
    },
    mainToken: {
        type: String,
        required: true,
    },
    rewardToken: {
        type: String,
        required: true,
    },
    startTime: {
        type: Number,
        required: true,
    },
    endTime: {
        type: Number,
        required: true,
    },
    decimals: {
        type: Number,
        required: true,
    },
    txhash: {
        type: String,
        required: true,
    },
    totalReward: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Pool: Model<IStakeModelDocument> = mongoose.models.Pool || mongoose.model<IStakeModelDocument>('Pool', poolSchema);

export default Pool;
