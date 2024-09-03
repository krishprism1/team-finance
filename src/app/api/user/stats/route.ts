import connect from "@/connection/db.config";
import Multisent from "@/models/multiSentModel";
import Token from "@/models/tokenModel";
import { NextRequest, NextResponse } from "next/server";

connect()

const stats = {
    vestingCount: 0,
    locksInfo: {
        totalCount: 0,
        tokenCount: 0,
        lpCount: 0,
        nftCount: 0
    },
    stakingCount: 0,
    mintCount: 0,
    totalServicesCount: 0,
    multisenderCount: 0,
    arr: [true, true, true, true, true, true, true]
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        let wallet = searchParams.get("wallet");
        const tokensCount = await Token.countDocuments({ wallet: wallet?.toLocaleLowerCase() })
        stats.mintCount = tokensCount;
        stats.arr[0] = stats.mintCount ? false : true

        const multisentCount = await Multisent.countDocuments({ wallet: wallet?.toLocaleLowerCase() })
        stats.multisenderCount = multisentCount;
        stats.arr[5] = stats.multisenderCount ? false : true

        stats.totalServicesCount = stats.mintCount + stats.multisenderCount + stats.vestingCount + stats.stakingCount + stats.locksInfo.tokenCount
        return NextResponse.json({ message: "user stats", success: true, data: stats })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}