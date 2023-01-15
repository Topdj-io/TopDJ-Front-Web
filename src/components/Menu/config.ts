import { MenuEntry } from '@kwswap/uikit'
import useTranslation from 'hooks/useTranslation'
import RoutePath from 'routes/routePath'

interface ConfigProps extends MenuEntry {
  finish?: boolean
}
const useConfig = () => {
  const { t } = useTranslation()
  const config: ConfigProps[] = [
    // {
    //   label: t('Home'),
    //   // icon: 'HomeIcon',
    //   href: '/',
    // },
    {
      label: t('MysteryBox'),
      // icon: 'IfoIcon',
      href: RoutePath.MYSTERY_BOX,
      finish: true,
    },

    {
      label: t('Achievement'),
      // icon: 'IfoIcon',
      href: RoutePath.COLLECTIONS,
      finish: true,
    },
    {
      label: t('Gallery'),
      // icon: 'FarmIcon',
      href: RoutePath.GALLERY,
    },
    {
      label: t('Marketplace'),
      // icon: 'IfoIcon',
      href: `/marketplace`,
      finish: true,
    },

    // {
    //   label: t('NFT Lending'),
    //   // icon: 'FarmIcon',
    //   href: RoutePath.FRAGMENTATION,
    // },
    // {
    //   label: t('Bridge'),
    //   href: RoutePath.BRIDGE,
    // },
    {
      label: t('Metaverse'),
      href: RoutePath.VR,
    },
    {
      label: t('Membership'),
      href: RoutePath.MEMBERSHIP,
    },
    {
      label: t('Roadmap'),
      href: RoutePath.ROADMAP,
    },
    {
      label: t('NftRemix'),
      href: RoutePath.NFTREMIX,
    },
  ]
  return config
}

export default useConfig
