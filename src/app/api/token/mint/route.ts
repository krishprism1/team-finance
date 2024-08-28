import connect from "@/connection/db.config";
import Token from "@/models/tokenModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        if (reqBody?.wallet) {
            reqBody.wallet = reqBody.wallet.toLowerCase();
        }
        const newToken = new Token(reqBody)
        const newUser = await newToken.save()

        return NextResponse.json({ message: "User created successfully!", success: true, newUser })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}