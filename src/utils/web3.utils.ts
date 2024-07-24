import { ethers } from "ethers"

export const contractInstance = (contract: string, abi: any, signer: string )=>{
    return new ethers.Contract(contract, abi, signer);
}


