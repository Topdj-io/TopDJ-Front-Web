import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Container from 'components/Layout/Container'
import { Tooltip } from '@mui/material'
import clsx from 'clsx'
import { useWalletModal, ConnectorNames } from '@kwswap/uikit'
import UnlockButton from 'components/UnlockButton'
import { useAccount } from 'state/userInfo/hooks'
import { contractWhitelistsType } from 'types/nftRemix'
import { LoadingButton } from '@mui/lab'
import useAuth from 'hooks/useAuth'
import { positions } from '@mui/system'
import SwiperControllerProps from 'swiper/types/swiper-class.d'
import { Swiper as ReactSwiper, SwiperSlide, SwiperProps } from 'swiper/react/swiper-react'
import SwiperCore, { Autoplay, FreeMode, Scrollbar, Mousewheel } from "swiper";
import 'swiper/swiper.min.css'

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 70,
        backgroundColor: '#171719',
        padding: '0 40px 40px'
    },
    btn: {
        width: '240px',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 600,
        lineHeight: '44px',
        background: '#8AFA0F',
        borderRadius: '2px',
        color: '#000',
        margin: '11px auto',
        cursor: 'pointer',
        marginTop: 40,
        textTransform: 'uppercase',
        padding: 10,
    },
    contract: {
        cursor: 'pointer',
        display: 'inline-block',
        margin: '0 auto',
        '&:nth-child(9n)': {
            marginRight: 0
        },
        // '&:nth-child(9n+1)':{
        //     marginLeft:0
        // }
    },
    img: {
        display: 'inline-block',
        width: 80,
        height: 80,
        margin: '0 auto 0 0',
        borderRadius: '50%'
    },
    toolTip: {
        maxWidth: 320,
        wordBreak: 'break-all',
    },
    title: {
        fontSize: 24,
        lineHeight: '90px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    flex: {
        display: 'flex',
        fontSize: 0,
        position: 'relative',
        '& .swiper-wrapper':{
            transitionTimingFunction: 'linear !important',
        }
    },
    pitchBox: {
        opacity: 0.6,
    },
    contractText: {

    },
    imgList: {
        position: 'relative',
    },
    imgBox: {
        padding: '40px 0',
        border: '1px solid #28282E',
        borderWidth: '1px 0',
        positions: 'relative',
    },
    leftBac: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 190,
        background: 'linear-gradient(270deg, rgba(23, 23, 25, 0) 0%, #171719 100%)',
        zIndex: 10,
    },
    rightBac: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 190,
        zIndex: 10,
        background: 'linear-gradient(270deg, #171719 0%, rgba(23, 23, 25, 0) 100%)',
    },
    marginBox:{
        margin:'40px 0'
    },
    
}))
interface vaildRemixProps {
    list?: contractWhitelistsType[]
    reverse?:boolean
    time?:number
}
const SwiperBox = ({ list,reverse,time }: vaildRemixProps) => {
    const classes = useStyles()
    const [contractList, setContractList] = useState<contractWhitelistsType[]>(list);
    const loop = true;
    return (
        <ReactSwiper
            modules={[Autoplay]}
            navigation
            slidesPerView={contractList.length}
            className={clsx(classes.flex)}
            speed={3000}
            autoplay={{
                delay: 10,
                disableOnInteraction: false,
                reverseDirection:reverse
            }}
            
            loop={loop}>
            {contractList.map((item, index) => (
                <SwiperSlide  className="swiper-slide">
                    <div className={classes.contract}>
                        <div className={clsx(classes.flex)}>
                            <Tooltip placement="top" componentsProps={{ tooltip: { className: classes.toolTip } }}
                                arrow
                                title={
                                    <span className={classes.contractText}>{item.name}:{item.contract}</span>
                                }
                            >
                                <img className={clsx(classes.img)} src={item.cover} alt="" />
                            </Tooltip>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </ReactSwiper>
    )
}

export default SwiperBox
