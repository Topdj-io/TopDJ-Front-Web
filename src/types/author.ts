export interface AuthorDetailType {
  id?: number
  name?: string
  first_name?: string
  last_name?: string
  description?: string
  avatar?:string
  avatar_resource?: {
    url?: string
  }
  background_inner?:string
  facebook?: string
  twitter?: string
  background_out_resource?: {
    url?: string
  }
  background_out?:string,
  background_inner_resource?: {
    url?: string
  }
  work_num?: number
  follower?: number
}
