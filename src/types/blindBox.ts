import { WorkDetailType } from './work'

export interface BlindBoxDetailType {
    id?: number
  title?: string
  sub_title?: string
  price?: number
  cover_resource?: {
    path?: string
    url?: string
  }
  series?: string
  start_time?: string
  end_time?: string
  open?: boolean
  close?: boolean
  introduction?: string
  total_issuance?: number
  remaining?: number
  work_arr?: WorkDetailType[]
}
