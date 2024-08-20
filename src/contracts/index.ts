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
        lockToken : "0x8e89F184a549Dc8f56728e4787b6157Af77Ec35E",
        stakeContract: "0xd6A07b8065f9e8386A9a5bBA6A754a10A9CD1074",
        url : "https://testnet.bscscan.com/"
    }
}
