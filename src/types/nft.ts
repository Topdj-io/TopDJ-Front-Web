import { WorkDetailType } from './work'

export interface NftDetailType extends WorkDetailType {
  work_id?: string
  token?:string
}

export interface NftHolderType {
  user_id: string
  address: string
  avatar_resource: {
    path: string
    url: string
  }
  updated_at:string
  avatar?:string
  num: number
  name: string
  token_id:number
}
