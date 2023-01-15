export type IfoStatus = 'idle' | 'coming_soon' | 'live' | 'finished'

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  subTitle?: string
  description?: string
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  projectSiteUrl: string
  currency: string
  currencyAddress: string
  tokenDecimals: number
  tokenSymbol: string
  releaseBlockNumber: number
  campaignId?: string
}

export enum QuoteToken {
  'BNB' = 'BNB',
  'CAKE' = 'CAKE',
  'SYRUP' = 'SYRUP',
  'BUSD' = 'BUSD',
  'TWT' = 'TWT',
  'UST' = 'UST',
  'ETH' = 'ETH',
  'COMP' = 'COMP',
  'SUSHI' = 'SUSHI',
  'WHT' = 'WHT',
  'USDC' = 'USDC',
  'MDX' = 'MDX',
  'USDT' = 'USDT', // NEED CHANGE
  'KWS' = 'KWS',
  'CANDY' = 'CANDY',
  'XCANDY' = 'XCANDY',
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
}

export interface Address {
  97?: string
  56?: string
  65?: string
  256?: string
  5?: string
}

export interface FarmConfig {
  id?: number // 唯一值
  pid: number
  lpSymbol: string
  isLp: boolean // 是否是lp交易对
  tokenDecimals?: number
  lpAddresses: Address
  trueLpAddress?: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAdresses: Address
  multiplier?: string
  isHash?: boolean // 是否是hash交易对
  isCommunity?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}
export interface NodeConfig {
  pid: number
  name: string
  img: string
  stringId?: number
  tokenSymbol: string
  tokenAddresses: Address
  tokenDecimals: number
}
export interface PoolConfig {
  sousId: number
  image?: string
  tokenName: string
  stakingTokenName: QuoteToken
  stakingLimit?: number
  stakingTokenAddress?: string
  contractAddress: Address
  poolCategory: PoolCategory
  projectLink: string
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  tokenDecimals: number
}
export interface TradeMiningConfig {
  pid: number
  name: string
  tokenAAddress?: string
  tokenBAddress?: string
  chainId: number
  decimals: number
}
export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type NftImages = {
  blur?: string
} & Images

export type NftVideo = {
  webm: string
  mp4: string
}

export type Nft = {
  name: string
  description: string
  images: NftImages
  sortOrder: number
  bunnyId: number
  video?: NftVideo
}

export type TeamImages = {
  alt: string
} & Images

export type Team = {
  id: number
  name: string
  description: string
  isJoinable?: boolean
  users: number
  points: number
  images: TeamImages
  background: string
  textColor: string
}
