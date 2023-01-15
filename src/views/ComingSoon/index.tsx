import React from 'react'
import Container from 'components/Layout/Container'
import ComingSoonText from 'components/ComingSoonText'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(({ palette }) => ({
  container: {
    textAlign: 'center',
    position: 'relative',
  },
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <div>
      <Container className={classes.container}>
        {/* <Img src="/images/walk.svg" /> */}

        <ComingSoonText />
      </Container>
    </div>
  )
}

export default Footer
