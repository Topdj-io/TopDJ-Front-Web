import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import PageLoading from 'components/Pageloading'
import { queryAuthorHotList } from 'services/author'
import { AuthorDetailType } from 'types/author'
import Swiper from './Swiper'
import BoxItem from './BoxItem'

const useStyles = makeStyles((theme) => ({
  container: {
  },
  title:{
    lineHeight: '60px',
    fontSize: 40,
    fontFamily: 'title',
    color: '#EFEFEF',
    padding:'40px 0 20px',
},
flexBox:{
    display:'flex',
    fontSize:0,
    flexWrap:'wrap'
},

// display:'inline-block',
// width:'30%',

}))
const DjMusician = () => {
  const classes = useStyles()
  const musicianList = [
    {head:'https://topdj0430.s3-accelerate.amazonaws.com/avatar/20220601154757.jpg',background:'https://topdj0430.s3-accelerate.amazonaws.com/background_image/1654067977000.png',djName:'T-Spoon',briefIntroduction:'T-Spoon is a Dutch Eurodance project founded in 1991 by rapper Shalamon Baskin (aka Shamrock) and co-founder Remy de Groot (aka Prince Peration). The project was offered a recording contract by No More Music. ',},
    {head:'https://topdj0430.s3-accelerate.amazonaws.com/avatar/20220601154750.jpg',background:'https://topdj0430.s3-accelerate.amazonaws.com/background_image/1654067991000.png',djName:'Sir-G',briefIntroduction:'Serge Ramaekers is a Belgian music producer, DJ known by the name Sir-G. He has been in the industry for over 40 years, and he has been composing and writing songs for many famous artists.  ',},
    {head:'https://topdj0430.s3-accelerate.amazonaws.com/avatar/20220601154801.jpg',background:'https://topdj0430.s3-accelerate.amazonaws.com/background_image/1654068001000.png',djName:'DJ-Grace',briefIntroduction:'Grace is an artist, DJ and producer. She knows her way around the world. One of the biggest female names for the highly chic and sophisticated clubs, venues and fashion shows. Grace’s Soul House music is a pure, honest blend between house and African drum rhythms.',},
    {head:'https://topdj0430.s3-accelerate.amazonaws.com/author/1647952185.jpg',background:'https://topdj0430.s3-accelerate.amazonaws.com/test/author/avatar/20220430144023.png',djName:'Yves V',briefIntroduction:"Yves V from the electronic wonderland Belgium, has kept the record for the most appearances at the world's top music festivals TOMORROWLAND. He has been listed on the DJMAG Global Top 100 DJ List for three consecutive years. He has worked with famous American DJ Steve Aoki; Belgian famous DJ duo Dimitri Vegas & Like Mike; Dutch music producer Afrojack, etc. ",},
    {head:'https://topdj0430.s3-accelerate.amazonaws.com/author/1647919037.jpg',background:'https://topdj0430.s3-accelerate.amazonaws.com/test/author/avatar/20220430143918.png',djName:'KURA',briefIntroduction:'Portuguese electronic music DJ and producer KURA, has been listed on the DJMAG Top 100 DJ List for four consecutive years, and is known as the best DJ in Portugal. He is also the designated DJ of TOMORROWLAND. He has toured at some top rated clubs in China and other countries for many times. He has worked with the Dutch DJ Tiësto; Dutch DJ Hardwell; British music producer and DJ Calvin Harris, etc.',},
    {head:'https://topdj0430.s3-accelerate.amazonaws.com/author/1647952245.jpg',background:'https://topdj0430.s3-accelerate.amazonaws.com/test/author/avatar/20220430144059.png',djName:'Pink Panda',briefIntroduction:'Pink Panda from the United Kingdom is one of the most potential DJ music producer on the DJMAG Global Top 100 DJ List. He has a unique music style and makes high-quality mixes. He has performed in some top nightclubs in China, the United States, Europe and other countries.',},
    {head:'https://topdj0430.s3-accelerate.amazonaws.com/author/1647951785.png',background:'https://topdj0430.s3-accelerate.amazonaws.com/test/author/avatar/20220430144158.png',djName:'Mariana BO',briefIntroduction:'Mariana BO, considered the only DJ, musician and producer in Mexico, implements a project that combines electronic music and violin, using the instrument in their live performances. She has the highest ranking among female DJs on the DJMAG Global Top 100 DJ List. Her collaborations on stage have been with KSHMR, TIESTO, MARTIN GARRIX, HARDWELL, STEVE AOKI, DAVID GUETTA, REHAB and etc. Mariana BO is a promise for the global electronic music. ',},
]
  return <div className={classes.container}>
  <div className={classes.title}>DJ Musician</div>
  <Grid container className={classes.flexBox} spacing={2}>{musicianList.map((item) => (<Grid  item xs={4} md={4} sm={12}><BoxItem animate data={item} border /></Grid>))}
  </Grid>
</div>
}

export default DjMusician
