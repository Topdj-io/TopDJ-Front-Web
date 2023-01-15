import React, { useMemo, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Image from 'components/Image'
import clsx from 'clsx'
import { Grid } from '@mui/material'
import { MembershipDetailType, MembershipType } from 'types/membership'
import Skeleton from 'components/Skeleton'
import { MEMBERSHIP_CARD_LIST } from 'config/constants/membershipList'
import Empty from './Empty'

const useStyles = makeStyles((theme) => ({
  list: {
    paddingTop: 30,
  },
  cardItem: {
    border: `2px solid ${theme.palette.divider}`,
    padding: '20px',
    cursor: 'pointer',
    fontSize: 16,
    position: 'relative',
  },
  imgContainer: {
    cursor: 'pointer',
    width: '100%',
    marginBottom: 20,
    backgroundSize: '100% 100%',
    overflow: 'hidden',
  },
  cardItemTextContent: {},
  cardItemTitle: {
    fontFamily: 'text-bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: 1.5,
    marginBottom: 5,
  },
  cardItemDescription: {
    color: theme.palette.text.secondary,
    height: 42,
    overflow: 'hidden',
    lineHeight: '21px',
    marginBottom: 20,
  },
  cardItemAmount: {
    margin: '0 -20px -20px',
    textAlign: 'center',
    fontFamily: 'text-bold',
    fontSize: 16,
    lineHeight: '50px',
    color: '#171719',
  },
  cardItemAmountDiamond: {
    background: 'linear-gradient(135deg, #FFFB00 0%, #E64CFF 35%, #10FFE0 70%, #A2FF23 100%)',
  },
  cardItemAmountGold: {
    background: 'linear-gradient(136deg, #FBFF00 0%, #FDBD00 49%, #FFE800 100%)',
  },
  cardItemAmountElite: {
    background: 'linear-gradient(136deg, #DFFFFF 0%, #95F4FF 51%, #DFFFFF 100%)',
  },
}))

interface MembershipListProps {
  hidden: boolean
  data?: MembershipDetailType[]
}
const MembershipList = ({ data, hidden }: MembershipListProps) => {
  const classes = useStyles()
  return (
    <div className={classes.list} hidden={hidden}>
      {data && data.length === 0 ? (
        <Empty hintText="You don't have any membership" />
      ) : (
        <Grid container spacing={2}>
          {(data || new Array(4).fill('')).map((item, index) => {
            const cardItem = MEMBERSHIP_CARD_LIST[item.token_id]
            return (
              <Grid item xs={6} md={3} key={item.id || index}>
                <div className={classes.cardItem}>
                  <div className={classes.imgContainer}>
                    <Image
                      src={cardItem?.img}
                      disableSpinner={false}
                      loading={<Skeleton variant="rectangular" width="100%" height="100%" />}
                    />
                  </div>
                  {item?.token_id ? (
                    <div className={classes.cardItemTextContent}>
                      <div className={classes.cardItemTitle}>{item.Name}</div>
                      <div className={classes.cardItemDescription}>{cardItem.content[0]}</div>
                      <div
                        className={clsx(classes.cardItemAmount, {
                          [classes.cardItemAmountDiamond]: item.token_id === MembershipType.DIAMOND,
                          [classes.cardItemAmountGold]: item.token_id === MembershipType.GOLD,
                          [classes.cardItemAmountElite]: item.token_id === MembershipType.ELITE,
                        })}
                      >
                        Amount: {item.total}
                      </div>
                    </div>
                  ) : (
                    <div className={classes.cardItemTextContent}>
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                    </div>
                  )}
                </div>
              </Grid>
            )
          })}
        </Grid>
      )}
    </div>
  )
}

export default MembershipList
