import { WorkDetailType } from './work'

export interface BlindBoxDetailTypeTop {
  box?:{
    id?: number
    title?: string
    sub_title?: string
    price?: number
    cover_resource?: {
      path?: string
      url?: string
    }
    cover?:string,
    series?: string
    start_time?: string
    end_time?: string
    start_at?:string
    open?: boolean
    close?: boolean
    introduction?: string
    total_issuance?: number
    remaining?: number
    background?:string
    end_at?:string,
    contract?:string
    remain?:number
    type?:number
  },
  works?: WorkDetailType[]
}
export enum MysteryBoxType {
  VIP = 1,
  PRESELL = 2,
  PUBLIC_AUCTION = 3,
}
