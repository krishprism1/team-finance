import { INFTLockModel } from '@/utils/interface.utils';
import mongoose, { Document, Model, Schema } from 'mongoose';

interface INFTLockModelDocument extends INFTLockModel, Document { }

const nftLockSchema: Schema<INFTLockModelDocument> = new mongoose.Schema({
    wallet: {
        type: String,
        required: true,
    },
    chainId: {
        type: Number,
        required: true,
    },
    nftAddr: {
        type: String,
        required: true,
    },
    tokenId: {
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
    referr: {
        type: String,
        required: true
    }
}, { timestamps: true });

const NFTLocks: Model<INFTLockModelDocument> = mongoose.models.NFTLocks || mongoose.model<INFTLockModelDocument>('NFTLocks', nftLockSchema);

export default NFTLocks;
