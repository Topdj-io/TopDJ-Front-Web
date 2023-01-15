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
const useStyles = makeStyles(({ palette, shape }) => ({
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
  container: {
    position: 'relative',
    textAlign: 'center',
    height: 294,
    cursor: 'pointer',
    transition: 'all linear 0.2s',
    borderRadius: shape.borderRadius,
    overflow: 'hidden',
    padding: ({ border }: StyleProps) => (border ? 2 : 0),
    '& .iconfont': {
      color: palette.text.secondary,
    },
    '&:hover': {
      // transform: 'translate(10px,-10px)',
      boxShadow: '2px 2px 10px 4px #060606',
    },
  },
  border: {
    border: '2px solid',
    borderImage:
      'linear-gradient(324deg, rgba(0, 0, 0, 1), rgba(109, 212, 0, 1), rgba(98, 54, 255, 1), rgba(224, 32, 101, 1)) 2 2',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,

    '&:after': {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      content: '""',
      transformOrigin: 'center center',
      // animation: '$rotate 20s linear infinite normal',
      background: palette.background.default,
      transform: 'rotate(45deg)',
      transition: 'all linear 0.3s',
    },
  },
  infoContainer: {
    background: 'linear-gradient(180deg, #171719 0%, #000000 100%)',
    padding: ({ border }: StyleProps) => (border ? '8px 8px 18px' : '10px 10px 20px'),
  },
  bg: ({ backgroundUrl }: StyleProps) => ({
    height: 84,
    background: `url(${backgroundUrl})  center center / cover`,
  }),
  protrait: {
    height: 92,
    width: 92,
    border: `2px solid ${palette.background.default}`,
    borderRadius: '50%',
    margin: '-46px auto 10px',
  },
  userName: {
    fontSize: 20,
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
    color: palette.text.secondary,
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
}))
interface TiltOptions {
  max?: number
  scale?: number
}
interface AuthorItemProps {
  data?: AuthorDetailType
  border?: boolean
  className?: string
  animate?: boolean | TiltOptions
}
const AuthorItem: React.FC<AuthorItemProps> = ({ data, border, className, animate }) => {
  const classes = useStyles({ backgroundUrl: data?.background_out, border })
  const [dialogVisible, setDialogVisible] = useState(false)
  const tiltOptions = useMemo(() => {
    if (!animate) {
      return { max: 1, scale: 1 }
    } else if (isBoolean(animate)) {
      return { max: 35, scale: 1.1 }
    }
    return animate
  }, [animate])
  return data?.id ? (
    <Tilt options={tiltOptions}>
      <Dialog
        open={dialogVisible}
        onClose={() => {
          setDialogVisible(false)
        }}
        maxWidth="xs"
        fullWidth
      >
        <div className={classes.dialogContent}>stay tuned</div>
      </Dialog>
      <div
        className={clsx(classes.container, className)}
        onClick={() => {
          setDialogVisible(true)
          data?.id && history.push(`${RoutePath.AUTHOR_DETAIL}?id=${data.id}`)
        }}
      >
        {border && <div className={classes.border} />}
        <div className={classes.infoContainer}>
          <div className={classes.bg} />
          <Avatar src={data?.avatar} className={classes.protrait} variant="rounded" />
          <div className={classes.userName}>{`${data?.first_name || ''} ${data?.last_name || ''}`}</div>
          <div className={classes.follower}>follower/{getBalanceNumber(data?.follower / 1000, 0)}k</div>
          <div className={classes.userDescription}>{data.work_num || 0} works</div>
          <Icon
            baseClassName="iconfont dj-twitter"
            onClick={(e) => {
              e.stopPropagation()
              window.open(data?.twitter)
            }}
          />
        </div>
      </div>
    </Tilt>
  ) : (
    <div className={classes.container}>
      <div className={classes.infoContainer}>
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="circular" className={classes.portraitSkeleton} />
        <Skeleton />
        <Skeleton />
        <Skeleton variant="circular" className={classes.iconSkeleton} />
      </div>
    </div>
  )
}

export default AuthorItem
