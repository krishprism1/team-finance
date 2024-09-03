import connect from "@/connection/db.config";
import Multisent from "@/models/multiSentModel";
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
        const [mint, multisent] = await Promise.all([
            Token.findOne({ wallet }).sort({ createdAt: -1 }),
            Multisent.findOne({ wallet }).sort({ createdAt: -1 })
        ]);
        const data = { mint, multisent }
        return NextResponse.json({ message: "Token list!", success: true, data })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}