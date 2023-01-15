import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@mui/styles'
import PartHeader from 'components/PartHeader'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { NftHolderType } from 'types/nft'
import useParsedQueryString from 'hooks/useParsedQueryString'
import LoadMore from 'components/LoadMore'
import { queryNftHolderList } from 'services/nft'
import { useUpdateEffect } from 'ahooks'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 110,
  },
  portraitCell: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: 40,
      width: 40,
      margin: '-8px 20px -8px 40px',
      borderRadius: '50%',
    },
  },
  table: {
    marginBottom: 20,
  },
}))

const columns = [{ headerName: 'NFT HOLDER' }, { headerName: 'SERIES' }, { headerName: 'ADDRESS' }]

const HolderList = () => {
  const { id } = useParsedQueryString()
  const classes = useStyles()
  const [data, setData] = useState<NftHolderType[]>([])
  const loadMoreRef: any = useRef()
  const handleLoadMore = async (page: number) => {
    const res = await queryNftHolderList({ work_id: id, page, size: 10 })
    if (page === 1) {
      setData(res.data.list||[])
    } else {
      setData([...data, ...res.data.list])
    }
    return res.data.total as number
  }
  useUpdateEffect(() => {
    loadMoreRef?.current?.reset()
  }, [id])
  return (
    <div className={classes.container}>
      <PartHeader noStyle title="Current holder address" />
      <Table sx={{ minWidth: 650 }} className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((item, index) => {
              return (
                <TableCell align="center" key={index}>
                  {item.headerName}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                <div className={classes.portraitCell}>
                  <img src={row.avatar} alt="" />
                  {row.name}
                </div>
              </TableCell>
              <TableCell align="center"># {row.token_id}</TableCell>
              <TableCell align="center">{row.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <LoadMore ref={loadMoreRef} load={handleLoadMore} />
    </div>
  )
}

export default HolderList
