import { bigToIntClean, formatName } from "./math.utils";

const Moralis = require('moralis').default;

let isMoralisStarted = false;

const startMoralis = async () => {
  if (!isMoralisStarted) {
    await Moralis.start({
      apiKey: "BywfC3PuhquLq6T9RSGO25bGOLqP2DlNhsFUsaEQ1PnqVSMPQYZKWcZNxenUhoKc",
    });
    isMoralisStarted = true;
  }
};

export const getWalletTransaction = async (wallet:string, network:string) => {
  try {
    await startMoralis();
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: "0x61",
      address: wallet,
    });
    const result = response.raw?.map((item:any)=> {
        return {
            token: item.token_address,
            name: formatName(item.name),
            symbol: formatName(item.symbol),
            balance: bigToIntClean(item.balance),
        }
    })
    return result;
  } catch (e:any) {
    console.error(e.message);
  }
};

