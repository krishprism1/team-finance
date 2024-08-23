import { ethers } from 'ethers';

const readInstance = (_contract: string, _rpc: string, _abi: any) => {
    let provider = new ethers.JsonRpcProvider(_rpc)
    return new ethers.Contract(_contract, _abi, provider);
}

export const fetchNFTDetails = async (_contract: string, _rpc: string, _tokenId: number, wallet: string, _abi: any) => {
    try {
        const instance = readInstance(_contract, _rpc, _abi)
        const name = await instance.name();
        const symbol = await instance.symbol();
        const ownerAddress = await instance.ownerOf(_tokenId);
        if (ownerAddress.toLowerCase() != wallet.toLocaleLowerCase()) {
            return null;
        }
        return { name, symbol }
    } catch (error) {
        console.error('Error fetching NFT details:', error);
    }
}