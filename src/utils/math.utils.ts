import { BigNumber, ethers } from "ethers"

export const bigToInt = (BigNumber: BigNumber )=>{
    return Number(ethers.formatEther(BigNumber))
}

export const bigToIntClean = (BigNumber: BigNumber)=>{
    return Number(ethers.formatEther(BigNumber))
}

export const intToBig = (num: Number, decimal: Number )=>{
    return ethers.parseEther(num.toString(), decimal)
}

export function fixDec(num: number, dec: number = 2) {
    const calcDec = Math.pow(10, dec);
    return Math.trunc(num * calcDec) / calcDec;
}

export default function formatDate(date: string): string {
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = d.getFullYear();
    const month = months[d.getMonth()];
    const day = d.getDate().toString().padStart(2, '0');
    const hours = d.getUTCHours().toString().padStart(2, '0');
    const minutes = d.getUTCMinutes().toString().padStart(2, '0');
    return `${month} ${day}th, ${year}`;
  }