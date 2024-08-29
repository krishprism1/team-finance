import connect from "@/connection/db.config";
import NFTLocks from "@/models/nftLockModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        if (reqBody?.wallet) {
            reqBody.wallet = reqBody.wallet.toLowerCase();
        }
        const newEntry = new NFTLocks(reqBody)
        await newEntry.save()

        return NextResponse.json({ message: "NFT locked successfully!", success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}