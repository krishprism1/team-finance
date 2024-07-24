type Contract = {
    tokenFactory: string,
    vestingFactory: string
}

type Networks = {
    Binance:Contract
}

export const networks: Networks = {
    Binance: {
        tokenFactory : "0xa1aeD0f11EEC22731A93b2CA105A40E581D8D31E",
        vestingFactory: "0x64D06dcc12fA07e302f052a9F5BC1aa11e29D9E2"
    }
}
