import { BigNumberish, ethers } from "ethers"

export const bigToInt = (num: BigNumberish )=>{
    return Number(ethers.formatEther(num))
}

export const bigToIntClean = (num: BigNumberish)=>{
    return Number(ethers.formatEther(num))
}

export const intToBig = (num: Number, decimal: Number )=>{
    return ethers.parseUnits(num.toString(), decimal.toString())
}

export function fixDec(num: number, dec: number = 2) {
    const calcDec = Math.pow(10, dec);
    return Math.trunc(num * calcDec) / calcDec;
}

export function formatEthAddr(addr: string) {
    if (!addr || addr.length != 42) return addr; 
    return `${addr.slice(0, 5)}...${addr.slice(-5)}`;
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