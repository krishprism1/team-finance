import connect from "@/connection/db.config";
import Multisent from "@/models/multiSentModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        if (reqBody?.wallet) {
            reqBody.wallet = reqBody.wallet.toLowerCase();
        }
        const newEntry = new Multisent(reqBody)
        await newEntry.save()

        return NextResponse.json({ message: "Token sent successfully!", success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}