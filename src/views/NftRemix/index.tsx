import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { useAccount } from 'state/userInfo/hooks'
import { vaildRemix,vaildRemixContractWhitelists,memberVaildsAssets } from 'services/work'
import Container from 'components/Layout/Container'
import { vaildRemixType,contractWhitelistsType,remixListType } from 'types/nftRemix'
import PageLoading from 'components/Pageloading'
import SubmitCard from './components/SubmitCard'
import NoLoginCard from './components/NoLoginCard'
import DjMusician from './components/DjMusician'

const useStyles = makeStyles((theme) => ({
  container: {
    background: 'url(/images/membership/bg2.png) no-repeat top center',
    backgroundSize: 'cover',
    paddingBottom: 199,
    marginBottom: -100,
  },
  pageTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '44px',
    fontFamily: 'title',
    padding: '80px 0 20px',
    color:'#8AFA0F',
  },
  pageTip:{
    fontSize: '20px',
    color: '#FFFFFF',
    textAlign:'center',
    width:880,
    margin:'0 auto',
    lineHeight: '26px',
  },
  pagePrice:{
    paddingTop:30,
    fontSize:24,
    textAlign:'center',
    color:'#8AFA0F',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontFamily: 'title',
  },
  opensea:{
    width:24,
    height:24,
    verticalAlign: 'top',
    marginTop:10,
    marginLeft:24,
    cursor:'pointer',
  }
}))

const NftRemix = () => {
  const classes = useStyles()
  const account = useAccount()
  const [vaildRemixList, setVaildRemixList] = useState<vaildRemixType>({})
  const [remixList1, setRemixList1] = useState<contractWhitelistsType[]>([])
  const [remixList2, setRemixList2] = useState<contractWhitelistsType[]>([])
  const [remixList3, setRemixList3] = useState<contractWhitelistsType[]>([])
  const [contractWhitelists, setContractWhitelists] = useState<contractWhitelistsType[]>([])
  const handleVaildRemix = async () => {
    const data = !account?await vaildRemixContractWhitelists({}):await memberVaildsAssets({});
    const res = await vaildRemix();
    if(account){
      setContractWhitelists(data.data||[]);
    }else{
      setRemixList1(data.data.slice(0, 9));
      setRemixList2(data.data.slice(9, 18));
      setRemixList3(data.data.slice(18, 27));
    }
    
    setVaildRemixList(res.data)
 }
 const goOpensea = ()=>{
   window.open('https://opensea.io/collection/topdj-nft-remix')
 }
 useEffect(() => {
  setVaildRemixList({})
  handleVaildRemix()
}, [account])
  return vaildRemixList?.id?(
    <div className={classes.container}>
      <Container>
        <div className={classes.pageTitle}>{vaildRemixList.title}<img onClick={goOpensea}  className={classes.opensea} src="/images/opensea.svg" alt="" /></div>
        
        {!account&&(<div className={classes.pageTip} dangerouslySetInnerHTML = {{ __html : vaildRemixList?.description }} />)}
        <div className={classes.pagePrice}>{vaildRemixList.remain} / {vaildRemixList.total} minted</div>
        {account?(<SubmitCard  list={contractWhitelists} data={vaildRemixList} />):(<NoLoginCard list1={remixList1} list2={remixList2} list3={remixList3} />)}
        <DjMusician />
      </Container>
    </div>
  ): (
      <PageLoading />
    )
}

export default NftRemix
