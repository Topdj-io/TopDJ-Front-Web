import React from 'react'
import { makeStyles, useTheme } from '@mui/styles'
import { Grid, useMediaQuery } from '@mui/material'
import Container from 'components/Layout/Container'
import { socialList, linkList } from './config'
import FooterPhone from './FooterPhone'

const useStyles = makeStyles((theme) => ({
  container: {
    background: '#101011',
    marginTop: 100,
    color: theme.palette.text.secondary,
    padding: '60px 0',
    position: 'relative',
    fontSize: 14,
    '&:before': {
      // background: 'linear-gradient(90deg, #E700FF 0%, #FF0202 24%, #FFE000 55%, #00FFFC 77%, #85FF00 100%)',
      height: 6,
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      padding: '30px 10px 50px',
      fontSize: 12,
    },
  },
  logo: {
    height: '48px',
    marginBottom: '30px',
    display: 'block',
    [theme.breakpoints.down('md')]: {
      height: '30px',
    },
  },
  listItem: {
    width: '200px',
    cursor: 'pointer',
  },
  socialImg: {
    marginRight: 10,
  },
  socialContainer: {
    marginTop: 40,
  },
}))

const Footer = () => {
  const classes = useStyles()

  const theme = useTheme()
  const isPhone = useMediaQuery(theme.breakpoints.down('md'))
  const open = (url: string) => {
    url && window.open(url)
  }
  return (
    <div className={classes.container}>
      {isPhone ? (
        <FooterPhone />
      ) : (
        <Container>
          <Grid container spacing={2} justifyContent="space-between" alignItems="end">
            <Grid item>
              <img className={classes.logo} alt="" src="/images/logo.svg" />
              <div>@copyright by Topdj all right reserved</div>
            </Grid>
            <Grid item justifyContent="flex-end">
              <Grid container alignItems="center">
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
              <Grid container className={classes.socialContainer}>
                {socialList.map((item) => (
                  <Grid
                    item
                    container
                    onClick={() => {
                      open(item.link)
                    }}
                    key={item.title}
                    className={classes.listItem}
                    alignItems="center"
                  >
                    <Grid item>
                      <img className={classes.socialImg} src={item.img} alt="" />
                    </Grid>
                    <Grid item>{item.title}</Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
      {/* </Bubbles> */}
    </div>
  )
}

export default Footer
