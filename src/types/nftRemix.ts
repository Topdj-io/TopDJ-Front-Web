export interface  vaildRemixType{
  id?:number
  background?: string
contract?: string
contract_id?:number
image?: string
decimal?:number
description?: string
end_at?: string
free?: boolean
introduction?: string
open?: boolean
price?:number
remain?:number
series?: string
start_at?: string
sub_title?: string
title?: string
total?:number
token_id?:string
minted?:boolean
}
export interface  checkType{
    URL?:string
    mint?:boolean
    token?:string
}
export interface  preReminType{
    decimal?: number
    free?: boolean
    price?: number
}
export interface  preReminDataType{
    code?: number
    hash?: string
}
export interface  contractWhitelistsType{
    "id"?: number
    "remix_id"?: number
    "cover"?: string
    "contract"?: string
    "created_at"?: string
    "updated_at"?: string
    name?:string
    token_id?:string
    image?:string
    minted?:boolean
}
export interface  remixListType{
    list:contractWhitelistsType[]
    direction?:boolean
}
