import { ethers, JsonRpcSigner } from "ethers"
export const contractInstance = (contract: string, abi: any, signer: JsonRpcSigner )=>{
    return new ethers.Contract(contract, abi, signer);
}


