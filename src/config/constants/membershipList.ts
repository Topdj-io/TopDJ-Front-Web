import { MembershipType, MembershipStatus } from 'types/membership'

export interface MembershipCardItemData {
  id: number
  img: string
  title: string
  price: number
  buttonText: string
  content: string[]
  num?: number
  remain_num?: number
  status?: MembershipStatus
}
interface membershipcardListProps {
  [key: number]: MembershipCardItemData
}
export const MEMBERSHIP_CARD_LIST: membershipcardListProps = {
  [MembershipType.DIAMOND]: {
    id: 1,
    img: 'https://topdj0430.s3-accelerate.amazonaws.com/member/card1.gif',
    buttonText: 'Buy',
    title: 'Diamond Genesis Membership',
    price: 0.17,
    content: [
      'Redeemable for 3 mystery boxes each collection batch',
      'Highest “Hold to Earn” rate for tokens',
      'Free mint for next Gen PFP membership',
      'Highest priority to purchase limited edition',
      'Merchandises&NFTs',
      'Exclusive giveaways for collab Whitelists',
    ],
  },
  [MembershipType.GOLD]: {
    id: 2,
    img: 'https://topdj0430.s3-accelerate.amazonaws.com/member/card2.gif',
    title: 'Gold Genesis Membership',
    buttonText: 'Buy',
    price: 0.12,
    content: [
      'Redeemable for 2 mystery boxes each collection batch',
      'More “Hold to Earn” rate for tokens',
      'Free mint for next Gen PFP membership',
      'High priority to purchase limited edition merchandises & NFTs',
      'Giveaways for collab Whitelists',
    ],
  },
  [MembershipType.ELITE]: {
    id: 3,
    img: 'https://topdj0430.s3-accelerate.amazonaws.com/member/card3.gif',
    title: 'Elite Genesis Membership',
    buttonText: 'Buy',
    price: 0.07,
    content: [
      'Redeemable for 1 mystery boxes each collection batch',
      '“Hold to Earn” for tokens',
      'Free mint for next Gen PFP membership',
      'To purchase limited edition merchandises & NFTs',
      'Giveaways for collab Whitelists',
    ],
  },
}
