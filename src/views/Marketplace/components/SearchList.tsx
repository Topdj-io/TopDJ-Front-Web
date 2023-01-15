import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import PageLoading from 'components/Pageloading'
import { Grid, InputBase, InputAdornment,CircularProgress } from '@mui/material'
import AuthorItem from 'widget/Gallery/AuthorItem'
import WorkItem from 'widget/Marketplace/WorkItem'
import { WorkDetailType } from 'types/marknft'
import { pagination } from 'services/markNft'
import { useDebounceFn } from 'ahooks'
import clsx from 'clsx'

interface StylesProps {
  sortDown?: boolean
}
const useStyles = makeStyles(({ palette, shape }) => ({
  container: {
    marginBottom: 100,
  },
  searchContainer: {
    marginTop: 40,
    marginBottom: 40,
    fontSize: 14,
  },
  input: {
    color: palette.text.primary,
    width: '100%',
    background: palette.background.default,
    padding: '16px 20px',
    lineHeight: '20px',
    borderRadius: shape.borderRadius,
    '& $icon': {
      marginRight: 10,
    },
    '& input': {
      padding: 0,
      height: 20,
    },
  },
  filter: {
    background: palette.background.default,
    display: 'flex',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    borderRadius: shape.borderRadius,
  },
  icon: {
    height: 24,
    width: 24,
  },
  sort: {
    color: palette.text.fourth,
    background: palette.background.default,
    height: 52,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 162,
    borderRadius: shape.borderRadius,
    cursor: 'pointer',
  },
  loadContainer: {
    textAlign: 'center',
    marginTop:30,
  },
  sortIcon: {
    marginRight: 20,
    transform: ({ sortDown }: StylesProps) => (sortDown ? 'none' : 'perspective(100px) rotateX(180deg)'),
  },
  loadText:{
    cursor: 'pointer',
  },
  containerText:{
    textAlign:'center',
  }
}))
const SearchList = () => {
  const [data, setData] = useState<WorkDetailType[]>([])
  const [filterData, setFilterData] = useState<WorkDetailType[]>([])
  const [searchKey, setSearchKey] = useState('')
  const [sortDown, setSortDown] = useState(true)
  const classes = useStyles({ sortDown })
  const [loading, setLoading] = useState(true)
  const [pagpage,setPagpage] = useState(1);
  const [pagsize,setPagsize] = useState(10);
  const [pagorder,setPagorder] = useState('');
  // 数量不多先前端做排序搜索
  const { run: getAuthorList } = useDebounceFn(
    async () => {
      const res = await pagination({ keyword: searchKey,order:pagorder,page:pagpage,size:pagsize})
      if (pagpage === 1) {
        setData(res.data.list ||[])
        setFilterData(res.data.list ||[])
      } else {
        setData([...data, ...res.data.list])
        setFilterData([...filterData, ...res.data.list])
      }
      setLoading(false)
    },
    {
      wait: 1000,
      leading: true,
    },
  )

  const handleSort = () => {
    setData([])
    setFilterData([])
    setPagpage(1)
    setLoading(true)
    getAuthorList()
  }

  const handleSearch = () => {
    setData([])
    setFilterData([])
    setPagpage(1)
    setLoading(true)
    getAuthorList()
  }
  const handleLoadMore =(page)=>{
    const num = page +1;
    setPagpage(num)
    setLoading(true)
    getAuthorList()
  }
  const isCanLoadMore =(res)=>{
    return res.length%pagsize === 0
  }
  useEffect(() => {
    getAuthorList()
  }, [])
  return !loading?(
    <div className={classes.container}>
      <Grid container spacing={2} className={classes.searchContainer}>
        <Grid item>
          <div className={classes.filter}>
            <img src="/images/icon/filter.svg" alt="" className={classes.icon} />
          </div>
        </Grid>
        <Grid item xs>
          <InputBase
            placeholder="Search for things that interest you"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value)
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
            startAdornment={
              <InputAdornment position="start">
                <img src="/images/icon/search.svg" alt="" className={classes.icon} />
              </InputAdornment>
            }
            className={classes.input}
          />
        </Grid>
        <Grid item>
          <div className={classes.sort} onClick={handleSort}>
            <img src="/images/icon/sort.svg" alt="" className={clsx(classes.icon, classes.sortIcon)} />
            sort order
          </div>
        </Grid>
      </Grid>
      {filterData.length>0&&(<><Grid container rowSpacing={3} columnSpacing={2} columns={5}>
        {filterData.map((item) => (
          <Grid zeroMinWidth item xs={1}>
            <WorkItem data={item} showRarityTag />
          </Grid>
        ))}
      </Grid>
      <div className={classes.loadContainer} >
          {loading && <CircularProgress size={30} color="inherit" />}
          {!loading&&isCanLoadMore(filterData) && <span onClick={() => {
            handleLoadMore(pagpage)
          }} className={classes.loadText}>LoadMore</span>}
          {!loading&&!isCanLoadMore(filterData) && <span >NoMore</span>}
        </div></>)}
        {filterData.length===0&&<div className={classes.containerText}>There's nothing on the shelves</div>}
    </div>
  ): (
    <PageLoading />
  )
}

export default SearchList
