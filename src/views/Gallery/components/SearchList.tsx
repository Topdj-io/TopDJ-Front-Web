import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import PageLoading from 'components/Pageloading'
import { Grid, InputBase, InputAdornment } from '@mui/material'
import AuthorItem from 'widget/Gallery/AuthorItem'
import { queryAuthorList } from 'services/author'
import { AuthorDetailType } from 'types/author'
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
  sortIcon: {
    marginRight: 20,
    transform: ({ sortDown }: StylesProps) => (sortDown ? 'none' : 'perspective(100px) rotateX(180deg)'),
  },
}))
const SearchList = () => {
  const [data, setData] = useState<AuthorDetailType[]>([])
  const [filterData, setFilterData] = useState<AuthorDetailType[]>(new Array(5).fill(''))
  const [searchKey, setSearchKey] = useState('')
  const [sortDown, setSortDown] = useState(true)
  const classes = useStyles({ sortDown })
  const [loading, setLoading] = useState(true)
  // 数量不多先前端做排序搜索
  const { run: getAuthorList } = useDebounceFn(
    async () => {
      const res = await queryAuthorList({ name: '', order: 'desc', page: 1, size: 10000 })
      
      setData(res.data.list)
      setFilterData(res.data.list)
      setLoading(false)
    },
    {
      wait: 1000,
      leading: true,
    },
  )

  const handleSort = () => {
    setSortDown(!sortDown)
    const newData = data.sort((item1, item2) =>
      sortDown ? item1.work_num - item2.work_num : item2.work_num - item1.work_num,
    )
    setFilterData(newData)
  }

  const handleSearch = () => {
    if (searchKey.trim() === '') {
      setFilterData(data)
    }
    const newData = data.filter((item) => {
      const totalName = (item.first_name + item.last_name).toLowerCase()
      return totalName.indexOf(searchKey.trim().toLowerCase()) > -1
    })
    setFilterData(newData)
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
      <Grid container rowSpacing={3} columnSpacing={2} columns={5}>
        {filterData.map((item) => (
          <Grid zeroMinWidth item xs={1}>
            <AuthorItem data={item} animate={{ max: 35, scale: 1 }} />
          </Grid>
        ))}
      </Grid>
    </div>
  ): (
    <PageLoading />
  )
}

export default SearchList
