/// <reference types="react-scripts" />

declare module '*.less'
interface Window {
  ethereum?: {
    isMetaMask?: true
    request?: (...args: any[]) => Promise<void>
  }
  BinanceChain?: {
    bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>
  }
  toast: any
}
declare module 'axios'
type SerializedBigNumber = string

declare module '*.scss'
declare const $: any
