export const createTokenProps = {
    title: "Token Creation",
    subtitle: "Create your first token",
    desc: "Deploy your own audited token in seconds. Set advanced features, such as minting, burning and more.",
    btnName: "Create Token",
    route: "/mint"
}

export const tokenSenderProps = {
    title: "Multisender",
    subtitle: "Send tokens to multiple wallets",
    desc: "Send to multiple addresses in just a few clicks.",
    btnName: "Send Tokens",
    route: "/multisender"
}

export const tokenVestingProps = {
    title: "Token vesting",
    subtitle: "Create your first vesting contract",
    desc: "Let your investors, advisors and employees get paid automatically, without you having to lift a finger.",
    btnName: "Create Vesting",
    route: "/vesting"
}

export const tokenLockProps = {
    title: "Team token locks",
    subtitle: "Create your first team token lock",
    desc: "Use our non-custodial vaults to instantly increase your credibility.",
    btnName: "Create Team Token Lock",
    route: "/lock/project-token"
}

export const nftLockProps = {
    title: "NFT locks",
    subtitle: "Create your first NFT lock",
    desc: "Create a NFT lock today.",
    btnName: "Create NFT Lock",
    route: "/lock/nft"
}

export const tokenStaking = {
    title: "Token staking",
    subtitle: "Create your first Staking Pool",
    desc: "Create a Staking Pool today.",
    btnName: "Create Pool",
    route: "/staking"
}

export const tokenCard = {
    title: "Token Creation",
    description: "Create your own fully-audited token in 5 minutes with no programming experience.",
    btnOne: "Create audited token",
    btnTwo: "More info"
}

export const vestingCard = {
    title: "Token Vesting",
    description: "Let your investors, advisors and employees get paid automatically, without you having to lift a finger.",
    btnOne: "Create vesting",
    btnTwo: "More info"
}

export const teamLockCard = {
    title: "Team Token Locks",
    description: "Improve security and build trust in your token by locking your team Tokens.",
    btnOne: "Create team token lock",
    btnTwo: "More info"
}

export const nftLockCard = {
    title: "NFT Locks",
    description: "Lock your NFTs to showcase your confidence in the collection.",
    btnOne: "Create NFT lock ",
    btnTwo: "More info"
}

export const stakingCard = {
    title: "Staking",
    description: "Create a staking pool in seconds. Better rewards and tokenomics, without the hassle.",
    btnOne: "Create staking pool",
    btnTwo: "More info"
}

export const multisenderCard = {
    title: "Multisender",
    description: "Send tokens to unlimited wallet addresses in one single action.",
    btnOne: "Send token",
    btnTwo: "More info"
}

export const liquidityLockCard = {
    title: "Liquidity Locks",
    description: "Prevent rug pulls and increase community trust by locking LP tokens.",
    btnOne: "Create Liquidity lock",
    btnTwo: "More info"
}

const main = [{ name: "BSC Mainnet", chain: "binance", chainId: 56, logo: "https://app.team.finance/icons/wizard/binance.svg", status: false }]
const test = [{ name: "BSC Testnet", chain: "binance", chainId: 97, logo: "https://app.team.finance/icons/wizard/binance.svg", status: false }]
export const _chains = {
    mainnet: main,
    testnet: test
}
