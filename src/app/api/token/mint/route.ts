import connect from "@/connection/db.config";
import Token from "@/models/tokenModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { wallet, name, symbol, decimal, supply } = reqBody
        const newToken = new Token({
            wallet : wallet?.toLowerCase(),
            name : name,
            symbol: symbol,
            decimal: decimal,
            supply: supply
        })

        const newUser = await newToken.save()

        return NextResponse.json({ message: "User created successfully!", success: true, newUser })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}