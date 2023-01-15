import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Container from 'components/Layout/Container'
import { Tooltip } from '@mui/material'
import clsx from 'clsx'
import { useWalletModal, ConnectorNames } from '@kwswap/uikit'
import useWeb3Provider from 'hooks/useActiveWeb3React'
import useToast from 'hooks/useToast'
import { useUnactiveAccount, useSignLogin,useAccount } from 'state/userInfo/hooks'
import { contractWhitelistsType } from 'types/nftRemix'
import { LoadingButton } from '@mui/lab'
import useAuth from 'hooks/useAuth'
import { positions } from '@mui/system'
import SwiperBox from './SwiperBox'


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
        padding: 10,
    },
    contract: {
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
    marginBox: {
        margin: '40px 0'
    }
    // background: linear-gradient(270deg, rgba(23, 23, 25, 0) 0%, #171719 100%);
}))
interface vaildRemixProps {
    list1?: contractWhitelistsType[]
    list2?: contractWhitelistsType[]
    list3?: contractWhitelistsType[]
}
const SubmitCard = ({ list1,list2,list3 }: vaildRemixProps) => {
    const { login, logout } = useAuth(true)
    const [hasWalletLogin, setHasWalletLogin] = useState(false)
    const classes = useStyles()
    const { library } = useWeb3Provider()
    const unActiveAccount = useUnactiveAccount()
    const { toastInfo } = useToast()
    const account = useAccount()
    const sign = useSignLogin()
    const handleLogin = async (connectorID: ConnectorNames) => {
        await login(connectorID)
        setHasWalletLogin(true)
    }
    const { onPresentConnectModal } = useWalletModal(handleLogin, logout)

    // 钱包登录后
    useEffect(() => {
        if (unActiveAccount && library.provider && hasWalletLogin) {
        setHasWalletLogin(false)
        sign()
        }
    }, [unActiveAccount, hasWalletLogin, library])
    const loop = true;
    const reverse = true
    return (
        <div className={classes.container}>
            <Container>
                <div className={classes.title}>
                    Support List
                </div>
                <div className={clsx(classes.imgList)}>
                    <div className={classes.leftBac}> </div>
                    <div className={clsx(classes.imgBox)}>
                        <SwiperBox time={100} list={list1} />
                        <div className={classes.marginBox}>
                            <SwiperBox time={100}  reverse={reverse} list={list2} />
                        </div>
                        <SwiperBox time={100} list={list3} />
                    </div>
                    <div className={classes.rightBac}> </div>
                </div>
                <div className={classes.flex}>
                    <LoadingButton
                        className={classes.btn}
                        variant="contained"
                        loading={false}
                        onClick={onPresentConnectModal}
                        size="large"
                    >
                        Unlock wallet to mint
                    </LoadingButton>
                </div>
            </Container>
        </div>
    )
}

export default SubmitCard
