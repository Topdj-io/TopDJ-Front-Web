import { AuthorDetailType } from './author'

export interface WorkDetailImgType {
  type: string
  url: string
  order_num: number
}
export interface WorkDetailType {
  id?: string
  title?: string
  sub_title?: string
  introduction?: string
  created_at?: string
  published_total?: number
  series?: string
  buyer?:string
  published_date?: string
  serial_num?: string
  cover_resource?: WorkDetailImgType
  resource_arr?: WorkDetailImgType[]
  author?: AuthorDetailType
  type?: WorkType
  hold?: boolean
  rarity?: WorkRarityType
  collectors?: number,
  cover?:string
  price?:number
  expired?:string
  require_total?:number
  path?:string
  work_id?:string
  have?:boolean
  push?:string
  symbol?:string
  opensea?:string
  token_id?:number
  work?:{
    cover: string
    created_at: string
    description: string
    id: number
    path: string
    published_date: string
    rarity: string
    serial_num: string
    author?: AuthorDetailType
    series: string
    sub_title: string
    title: string
    type: number
  }
}
export interface WorkDetailList {
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
export enum WorkType {
  VIDEO = 3,
  AUDIO = 2,
  PICTURE = 1,
  NOTE = 8,
  TICKETS = 9,
  newVideo = 4,
}

export enum WorkRarityType {
  UR = 'UR',
  SSR = 'SSR',
  SR = 'SR',
  R = 'R',
  N = 'N',
}
