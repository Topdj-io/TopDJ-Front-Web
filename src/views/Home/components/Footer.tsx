import React from 'react'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import clsx from 'clsx'

import { socialList, linkList } from 'components/Footer/config'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },

  logo: {
    height: 72,
    marginBottom: 120,
  },
  listItem: {
    cursor: 'pointer',
    width: 'auto',
  },
  socialImg: {
    marginRight: 10,
  },
  linkContainer: {
    marginBottom: 60,
  },
  socialContainer: {
    marginBottom: 60,
  },
  copyRight: {
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
}))
const Footer = () => {
  const classes = useStyles()
  const open = (url: string) => {
    url && window.open(url)
  }
  return (
    <div className={classes.container}>
      <img className={clsx(classes.logo, 'animate__animated part-title')} alt="" src="/images/logo.svg" />
      <Grid container spacing={4} alignItems="center" className={classes.linkContainer} justifyContent="center">
        {linkList.map((item, index) => (
          <Grid
            onClick={() => {
              open(item.link)
            }}
            className={clsx(classes.listItem, 'animate__animated', `animate__delay-${index + 1}s`)}
            key={item.title}
            item
          >
            {item.title}
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={4} justifyContent="center" alignItems="center" className={classes.socialContainer}>
        {socialList.map((item, index) => (
          <Grid
            item
            container
            onClick={() => {
              open(item.link)
            }}
            className={clsx(classes.listItem, 'animate__animated', `animate__delay-${index + 1}s`)}
            key={item.title}
            alignItems="center"
          >
            <Grid item>
              <img className={classes.socialImg} src={item.img} alt="" />
            </Grid>
            <Grid item>{item.title}</Grid>
          </Grid>
        ))}
      </Grid>
      <div className={clsx(classes.copyRight, 'animate__animated')}>@copyright by Topdj all right reserved</div>
    </div>
  )
}

export default Footer
