import React, { useMemo, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { AuthorDetailType } from 'types/author'
import { Icon, Avatar } from '@mui/material'
import { getBalanceNumber } from 'utils/formatBalance'
import history from 'routerHistory'
import clsx from 'clsx'
import RoutePath from 'routes/routePath'
import Skeleton from 'components/Skeleton'
import Tilt from 'react-tilt'
import { isBoolean } from 'lodash'
import Dialog from 'components/Dialog'

interface StyleProps {
  backgroundUrl?: string
  border?: boolean
}
const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 70,
        padding: '0 '
    },
    '@keyframes rotate': {
        '0%': {
          transform: ' translate(-50%,-50%) rotate(0deg)',
        },
        // '50%': {
        //   transform: 'rotate(360deg)',
        // },
        '100%': {
          transform: '  translate(-50%,-50%) rotate(360deg)',
        },
      },
    title:{
        lineHeight: '60px',
        fontSize: 40,
        fontFamily: 'title',
        color: '#EFEFEF',
    },
    border:{

    },
    // border: {
      
    //   top: 0,
    //   left: 0,
    //   bottom: 0,
    //   right: 0,
    //   zIndex: -1,
  
    //   '&:after': {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     bottom: 0,
    //     right: 0,
    //     content: '""',
    //     transformOrigin: 'center center',
    //     transform: 'rotate(45deg)',
    //     transition: 'all linear 0.3s',
    //   },
    // },
    infoContainer: {
        padding:10,
        background: '#171719',
    //   padding: ({ border }: StyleProps) => (border ? '8px 8px 18px' : '10px 10px 20px'),
    },
    // bg: ({ backgroundUrl }: StyleProps) => ({
    //   height: 84,
    //   background: `url(${backgroundUrl})  center center / cover`,
    // }),
    bg:{

    },
    
    containerBox:{
        background: 'linear-gradient(180deg, #171719 0%, #000000 100%)',
        borderImage: 'linear-gradient(327deg, transparent, transparent,transparent,rgba(109, 212, 0, 1), rgba(98, 54, 255, 1), rgba(224, 32, 101, 1)) 2',
        border: '2px solid',
        marginBottom:'30px!important',
        '&:hover': {
            boxShadow: '2px 2px 10px 4px #060606',
        },
        margin:'0 auto!important',
        '&:nth-child(3n+1)':{
            marginLeft:'0!important',
        },
        '&:nth-child(3n)':{
            marginRight:'0!important',
        },
    },
    flex:{
        display:'flex',
        fontSize:0,
        width:'100%',
    },
    protrait: {
      height: 92,
      width: 92,
    //   border: `2px solid ${palette.background.default}`,
      borderRadius: '50%',
      margin: '-46px auto 10px',
    },
    userName: {
      fontSize: 20,
      margin:'10px 0',
      textAlign:'center',
      fontFamily: 'text-bold',
      lineHeight: 1.5,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    follower: {
      fontSize: 14,
      lineHeight: 1.5,
      marginBottom: 10,
    },
    userDescription: {
      marginBottom: 20,
    //   color: palette.text.secondary,
    },
    portraitSkeleton: {
      height: 60,
      width: 60,
      display: 'inline-block',
      margin: '10px 0 0',
    },
    iconSkeleton: {
      height: 30,
      width: 30,
      display: 'inline-block',
    },
    dialogContent: {
      fontFamily: 'text-bold',
      fontSize: 30,
      textAlign: 'center',
      textTransform: 'uppercase',
      padding: '50px 0',
    },
    djInstagram:{
        display:'inline-block',
        width:22,
        height:22,
        marginLeft:'20px',
        marginRight:'auto',
        background:'url(/images/icon/instagram-fill.svg) no-repeat',
        backgroundSize:'22px 22px',
        cursor:'pointer',
        '&:hover':{
          filter: 'grayscale(100%) brightness(160%)',
        }
    },
    djTwitter:{
        display:'inline-block',
        width:24,
        height:24,
        marginLeft:'auto',
        background:'url(/images/icon/twitter.svg) no-repeat',
        backgroundSize:'24px 24px', 
        cursor:'pointer',
        '&:hover':{
          filter: 'grayscale(100%) brightness(160%)',
        }
    },
    bgimg:{
        width:'100%',
    },
    contentText:{
        color:'#BABABA',
        padding:'0 6px',
        fontSize:12,
        lineHeight:'20px',
        textAlign:'left',
        height:'140px',
    },
    flexBox:{
        padding:'20px 0',
    }
}))
interface TiltOptions {
  max?: number
  scale?: number
}
interface   PropsType {
    head?: string
    background?: string
    djName?:string
    briefIntroduction?:string
  }
interface AuthorItemProps {
  data?: any
  border?: any
  className?: any
  animate?: boolean | TiltOptions
}
const BoxItem: React.FC<AuthorItemProps>= ({ data, border, className, animate }) => {
  const classes = useStyles()
  const [dialogVisible, setDialogVisible] = useState(false)
  const tiltOptions = useMemo(() => {
    if (!animate) {
      return { max: 1, scale: 1 }
    } else if (isBoolean(animate)) {
      return { max: 35, scale: 1.05 }
    }
    return animate
  }, [animate])
  return (
    <div
                      className={clsx(classes.containerBox)}
                  
          >
              <div className={classes.border} />
              <div className={classes.infoContainer}>
              <div className={classes.bg} >
                  <img className={classes.bgimg} src={data.background} alt="" />
              </div>
              <Avatar src={data?.head} className={classes.protrait} variant="rounded" />
              <div className={classes.userName}>{data.djName}</div>
              <div className={classes.contentText}>{data.briefIntroduction}</div>
              <div  className={clsx(classes.flex,classes.flexBox)} >
                  <Icon
                      className={classes.djTwitter}
                      onClick={(e) => {
                      e.stopPropagation()
                      window.open('https://twitter.com/KURA_live')
                      }}
                  />
                  <Icon
                      className={classes.djInstagram}
                      onClick={(e) => {
                      e.stopPropagation()
                      window.open('https://www.instagram.com/')
                      }}
                  />
              </div>
              
              </div>
          </div>
  )
}
export default BoxItem
