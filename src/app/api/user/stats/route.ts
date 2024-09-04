import connect from "@/connection/db.config";
import Multisent from "@/models/multiSentModel";
import NFTLocks from "@/models/nftLockModel";
import TokenLocks from "@/models/tokenLockModel";
import Token from "@/models/tokenModel";
import { NextRequest, NextResponse } from "next/server";

connect();

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
};

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        let wallet = searchParams.get("wallet")?.toLowerCase();

        // Running all queries concurrently
        const [tokensCount, multisentCount, tokenLock, nftLock] = await Promise.all([
            Token.countDocuments({ wallet }),
            Multisent.countDocuments({ wallet }),
            TokenLocks.countDocuments({ wallet }),
            NFTLocks.countDocuments({ wallet })
        ]);

        // Update stats with the results
        stats.mintCount = tokensCount || 0;
        stats.arr[0] = stats.mintCount === 0;

        stats.multisenderCount = multisentCount || 0;
        stats.arr[5] = stats.multisenderCount === 0;

        stats.locksInfo.tokenCount = tokenLock || 0;
        stats.arr[2] = stats.locksInfo.tokenCount === 0;

        stats.locksInfo.nftCount = nftLock || 0;
        stats.arr[3] = stats.locksInfo.nftCount === 0;

        // Calculate total services count
        stats.totalServicesCount = stats.mintCount
            + stats.multisenderCount
            + stats.vestingCount
            + stats.stakingCount
            + stats.locksInfo.tokenCount
            + stats.locksInfo.nftCount;

        return NextResponse.json({ message: "user stats", success: true, data: stats });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
