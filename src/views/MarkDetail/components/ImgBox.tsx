import React, { useEffect, useState, useMemo } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, ButtonBase } from '@mui/material'
import Skeleton from 'components/Skeleton'
import { WorkDetailImgType } from 'types/work'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import Image from 'components/Image'
import { getFileType } from 'utils/getFileType'
import { FileType } from 'config/constants/fileType'
import Video from 'components/Video'
import clsx from 'clsx'
import { getVideoBase64 } from 'utils/getBase64'

const useStyles: any = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  thumbImgContainer: {
    // width: 102,
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
  bigImg: {
    width: '100%',
    height: 560,
  },
  styleSelectedImg: {
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      left: 0,
      height: 2,
      background: theme.palette.primary.main,
    },
  },
  imgBtn: {
    position: 'relative',
  },
  playIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: 1,
    color: 'rgba(255,255,255,.8)',
    fontSize: 40,
  },
}))

interface ImgBoxPropsType {
  imgList: WorkDetailImgType[]
}

const ImgBox = ({ imgList }: ImgBoxPropsType) => {
  const [selectedImg, setSelectedImg] = useState<{ type: FileType; url: string; thumbUrl: string }>(undefined)
  const classes = useStyles()
  const [newImgList, setNewImgList] = useState(new Array(5).fill(''))

  const initImgList = async () => {
    if (imgList && imgList.length > 0) {
      const newList = await Promise.all(
        imgList?.map(async (item) => {
          const fileType = getFileType(item.url)
          let thumbUrl = item.url
          if (fileType === FileType.VIDEO) {
            thumbUrl = await getVideoBase64(item.url)
          }
          return {
            thumbUrl,
            url: item.url,
            type: fileType,
          }
        }),
      )
      setNewImgList(newList)
    }
  }
  // const newImgList = useMemo(() => {
  //   if (imgList) {
  //     return imgList.map((item, index) => {
  //       const fileType = getFileType(item.url)
  //       return {
  //         thumbUrl:
  //           fileType === FileType.VIDEO ? `${item.url}?vframe/jpg/offset/1/h/102` : `${item.url}?imageView2/4/h/102`,
  //         url: item.url,
  //         type: fileType,
  //       }
  //     })
  //   } else {
  //     return new Array(5).fill('')
  //   }
  // }, [imgList])

  useEffect(() => {
    setSelectedImg(newImgList[0])
  }, [newImgList])

  useEffect(() => {
    initImgList()
  }, [imgList])
  return (
    <div className={classes.container}>
      <Grid container spacing={1}>
        <Grid item container xs="auto" className={classes.thumbImgContainer} spacing={1.2} flexDirection="column">
          {newImgList?.map((item, index) => (
            <Grid item key={index}>
              <ButtonBase
                sx={{ width: 102, height: 102 }}
                onClick={() => {
                  setSelectedImg(item)
                }}
                className={classes.imgBtn}
              >
                {item.type === FileType.VIDEO && <PlayCircleOutlineIcon className={classes.playIcon} />}
                <Image
                  aspectRatio={1}
                  src={item.thumbUrl}
                  disableSpinner={false}
                  loading={<Skeleton width="100%" variant="rectangular" height="100%" />}
                  alt=""
                  className={clsx(classes.thumbImg, {
                    [classes.styleSelectedImg]: selectedImg?.url && item.url === selectedImg?.url,
                  })}
                />
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
        <Grid xs item>
          {selectedImg ? (
            selectedImg.type === FileType.VIDEO ? (
              <video src={selectedImg.url} loop controls preload="auto" autoPlay className={classes.bigImg} />
            ) : (
              // <Video loop preload="auto" controls autoPlay className={classes.bigImg}>
              //   <source src={selectedImg.url} />
              // </Video>
              // <ReactVideo loop preload="auto" controls src={selectedImg.url} autoPlay className={classes.bigImg} />
              <Image
                disableTransition
                disableSpinner={false}
                animationDuration={0}
                src={selectedImg.url}
                alt=""
                className={classes.bigImg}
              />
            )
          ) : (
            <Skeleton width="100%" variant="rectangular" height="100%" />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default ImgBox
