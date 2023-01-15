import { WorkDetailType,WorkDetailList } from './work'

export interface CollectionDetailType {
  collect?: {
    id?: number
    title?: string
    sub_title?: string
    cover?: string
    series?: string
    start_time?: string
    end_at?: string
    description?: string
    completed?: number
    banner?:string
    status?: CollectionExchangeStatusType
    banner_resource?: { url?: string }
    require_total?: number
  },
  reward_list?:WorkDetailList[]
  require_list?: WorkDetailType[],
  reward?:{
    cover?:string
    published_date?:string
    published_total?: number
    rarity?:string
    serial_num?: string,
    series?:string
    sub_title?:string
    title?:string
    type?:string
    work_id?: string
  }
  // id?: number
  // title?: string
  // sub_title?: string
  // cover?: string
  // series?: string
  // start_time?: string
  // end_time?: string
  // description?: string
  // completed?: number
  // status?: CollectionExchangeStatusType
  // banner_resource?: { url?: string }
  // require_total?: number
  // reward?: {
  //   id?: string
  //   work_id?: string
  //   cover_resource?: { url?: string }
  // }
  // require_arr?: WorkDetailType[]
}

export enum CollectionExchangeStatusType {
  NOT_QUALIFIED = 2,
  QUALIFIED = 3,
  EXCHANGED = 1,
}
