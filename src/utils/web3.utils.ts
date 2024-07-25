import { ethers } from "ethers"

export const contractInstance = (contract: string, abi: any, signer: any )=>{
    return new ethers.Contract(contract, abi, signer);
}


