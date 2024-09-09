type Contract = {
    tokenFactory: string,
    vestingFactory: string,
    multiSender: string,
    lockToken: string,
    stakeContract: string,
    url: string
}

type Networks = {
    Binance:Contract
}

export const networks: Networks = {
    Binance: {
        tokenFactory : "0xa1aeD0f11EEC22731A93b2CA105A40E581D8D31E",
        vestingFactory: "0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2",
        multiSender: "0xeE09F1F4765b3c84C539107ba472467301b4082D",
        lockToken : "0xba14EBE9E7D422E13C8237db2Dd866A258aAe95C",
        stakeContract: "0x118b987812d1158C664F2640a70654Fb47D7f732",
        url : "https://testnet.bscscan.com/"
    }
}
