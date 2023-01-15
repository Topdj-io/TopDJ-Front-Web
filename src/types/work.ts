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
  require_total?:number
  path?:string
  work_id?:string
  have?:boolean
  push?:string
  opensea?:string
  token_id?:number
  work?:works
}
export interface newWorkDetailType {
  
    nft?: nft
    "work"?: work1
    "author"?: author
    "order"?: order

}
export interface nft {
  "id": number
        "contract_id": number
        "code": number
        "type": number
        "work_id": number
        "rarity": number
        token_id?: number
        "creator_id": number
        "owner_id": number
        "price": number
        "decimal": number
        "symbol": string
        "version": number
        "status": number
}
export interface work1 {
  "id": number
        "type": number
        "title": string
        "sub_title": string
        "description": string
        "published_date": string
        "series": string
        "serial_num": string
        "rarity": string
        "cover": string
        "path": string
        "created_at": string
}
export interface author {
  "id": number
  "avatar": string
  "first_name": string
  "last_name": string
  "title": string
  "description": string
  "background_out": string
  "background_inner": string
  "hot": boolean
  "facebook": string
  "twitter": string
  "follower": number
  "status": number
  "work_num": number
}
export interface order {
  "id": number
        "order_id": number
        "contract_id": number
        "token_id": number
        "work_id": number
        "seller_id": number
        "seller": string
        "buyer_id": number
        "buyer": string
        "price": number
        "decimal":number
        "symbol": string
        "expired": string
        "complete": string
        "status": number
        "work": number
}
export interface works {
  cover: string
    created_at: string
    description: string
    id: number
    path: string
    published_date: string
    rarity: string
    serial_num: string
    series: string
    sub_title: string
    author?: AuthorDetailType
    title: string
    type: number
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
