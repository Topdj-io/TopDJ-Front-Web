import React from 'react'
import { makeStyles, useTheme } from '@mui/styles'
import { Grid, useMediaQuery } from '@mui/material'
import Container from 'components/Layout/Container'
import { socialList, linkList } from './config'

const useStyles = makeStyles((theme) => ({
  logo: {
    height: '30px',
    marginBottom: 10,
  },
  listItem: {
    padding: '15px 0',
    borderBottom: '1px solid #292929',
    fontSize: 12,
    lineHeight: 1.5,
  },
  socialImg: {
    height: 22,
    marginRight: 5,
  },
  socialContainer: {
    marginBottom: 25,
    padding: '25px 0',
    fontSize: 10,
    borderBottom: '1px solid #292929',
  },
}))

const FooterPhone = () => {
  const classes = useStyles()

  const theme = useTheme()
  const isPhone = useMediaQuery(theme.breakpoints.down('md'))
  const open = (url: string) => {
    window.open(url)
  }
  return (
    <Container>
      <img className={classes.logo} alt="" src="/images/logo.svg" />
      <Grid container flexDirection="column">
        {linkList.map((item) => (
          <Grid
            onClick={() => {
              open(item.link)
            }}
            className={classes.listItem}
            key={item.title}
            item
          >
            {item.title}
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={1} className={classes.socialContainer}>
        {socialList.map((item, index) => (
          <Grid
            item
            xs={index === socialList.length - 1 ? 6 : 4}
            container
            onClick={() => {
              open(item.link)
            }}
            key={item.title}
            alignItems="center"
          >
            <Grid item>
              <img className={classes.socialImg} src={item.img} alt="" />
            </Grid>
            <Grid item> {item.title}</Grid>
          </Grid>
        ))}
      </Grid>
      <div>@copyright by Topdj all right reserved</div>
    </Container>
  )
}

export default FooterPhone
