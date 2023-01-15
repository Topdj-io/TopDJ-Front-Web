export interface MembershipDetailType {
  id: number
  description: string
  name: string
  type: number
  status?: MembershipStatus
  Name?:string
  icon_resource: {
    path: string
    url: string
  }
  remain_num: number
  num: number
  price: number
}
export enum MembershipType {
  DIAMOND = 1,
  GOLD = 2,
  ELITE = 3,
}
export enum MembershipStatus {
  MINT = 0, // 可购买
  NO_WHITE_LIST = 1,
  NO_QUALIFICATIONS = 2,
  SOLD_OUT = 3,
  DISABLED = 4, // 不可购买
}
export interface MembershipActivityType {
  id?: number
  name?: string
  description?: string
  qualifications?: number
  cur_stage?: string
  pre_sale_end_time?: number
  pre_sale_start_time?: number
  sale_end_time?: number
  sale_start_time?: number
  pre_sale_start_time_on?: number
  pre_sale_end_time_on?: number
  member_arr?: MembershipDetailType[]
}
export enum MembershipActivityStage {
  VIP_SALE = 'vip-sale',
  PRE_SALE = 'pre-sale',
  PUBLIC_SALE = 'sale',
}
export default MembershipDetailType
