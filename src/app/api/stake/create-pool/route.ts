import connect from "@/connection/db.config";
import Pool from "@/models/poolModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        if (reqBody?.wallet) {
            reqBody.wallet = reqBody.wallet.toLowerCase();
        }
        const newPool = new Pool(reqBody)
        await newPool.save()

        return NextResponse.json({ message: "Pool created successfully!", success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}