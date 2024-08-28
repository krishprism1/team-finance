import connect from "@/connection/db.config";
import Token from "@/models/tokenModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        let wallet = searchParams.get("wallet");
        const mint = await Token.findOne({ wallet: wallet?.toLocaleLowerCase() }).sort({ createdAt: -1 });

        const data = { mint }
        return NextResponse.json({ message: "Token list!", success: true, data })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}