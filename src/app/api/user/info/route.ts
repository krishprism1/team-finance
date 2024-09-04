import connect from "@/connection/db.config";
import Multisent from "@/models/multiSentModel";
import NFTLocks from "@/models/nftLockModel";
import TokenLocks from "@/models/tokenLockModel";
import Token from "@/models/tokenModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        let wallet = searchParams.get("wallet");
        if(wallet){
            wallet = wallet.toLocaleLowerCase();
        }
        const [mint, multisent, tokenlock, nftlock] = await Promise.all([
            Token.findOne({ wallet }).sort({ createdAt: -1 }),
            Multisent.findOne({ wallet }).sort({ createdAt: -1 }),
            TokenLocks.findOne({ wallet }).sort({ unlockTime: 1 }),
            NFTLocks.findOne({ wallet }).sort({ unlockTime: 1 })
        ]);
        const data = { mint, multisent, tokenlock, nftlock }
        return NextResponse.json({ message: "Token list!", success: true, data })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

