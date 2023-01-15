import React from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Typography, Icon } from '@mui/material'
import { Timeline, TimelineItem, TimelineSeparator, TimelineContent, TimelineDot, TimelineConnector } from '@mui/lab'
import Container from 'components/Layout/Container'
import clsx from 'clsx'
import LoadedImage from 'components/Image/loadedImage'

const useStyles = makeStyles(({ palette }) => ({
  container: {
    marginBottom: -100,
    '& .MuiTimelineDot-root:not($roadmapPartTitle)': {
      margin: 0,
      background: 'transparent',
      padding: 0,
      border: 0,
    },
    '& .MuiTimelineContent-root': {
      padding: '0 30px',
    },
    '& .MuiTimelineConnector-root': {
      background: '#2B2A2A',
    },
    '& .MuiTypography-h6': {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      lineHeight: 1,
      marginTop: 3,
    },
    '& .MuiTimeline-root': {
      padding: 0,
      '& .MuiTimelineItem-root:nth-child(2n)': {
        '& .MuiTypography-h6,& .MuiTimelineDot-root': {
          color: palette.primary.main,
        },
      },
      '& .MuiTimelineItem-root:nth-child(2n-1):not(:first-child)': {
        '& .MuiTypography-h6,& .MuiTimelineDot-root': {
          color: '#FF00B2',
        },
      },
    },
    '& .MuiTimelineItem-root': {
      '&:before': {
        padding: '0 30px',
      },
    },
  },
  containerContent: {
    // background: 'url(/images/roadmap/bg.jpg) no-repeat top center',
    // backgroundSize: 'contain',
    paddingTop: 114,
    textAlign: 'center',
    position: 'relative',
  },
  containerContentBg: {
    position: 'absolute',
    zIndex: -1,
    left: 0,
    top: 0,
    width: '100%',
  },
  logo: {
    width: 278,
    display: 'block',
    margin: '0 auto 30px',
  },
  circleIcon: {
    width: 54,
    display: 'block',
    margin: '0 auto 40px',
  },
  roadmapTitle: {
    fontFamily: 'text-bold',
    marginBottom: 50,
    fontSize: 28,
  },
  roadmapPartTitle: {
    background: 'url(/images/roadmap/titleBg1.png) no-repeat center center ',
    backgroundSize: '100% 100%',
    border: 0,
    whiteSpace: 'nowrap',
    lineHeight: '56px',
    padding: '0 20px',
    fontSize: 28,
    fontFamily: 'text-bold',
    color: '#000',
    borderRadius: 0,
    fontWeight: 'bold',
    margin: 0,
    position: 'relative',
    '& img': {
      position: 'absolute',
      width: 25,
      right: -50,
      top: 10,
    },
  },
  roadmapPartTitle2: {
    background: 'url(/images/roadmap/titleBg2.png) no-repeat center center ',
    backgroundSize: '100% 100%',
  },
  emptyContent: {
    height: 100,
  },
  textContent: {
    fontSize: 18,
    '& p': {
      marginBottom: 10,
    },
  },
  textArrow: {
    height: 21,
    marginTop: -2,
    marginRight: 5,
  },
  textArrowRight: {
    marginRight: 0,
    marginLeft: 5,
  },
  dashContainer: {
    border: '1px dashed #FFE700',
    width: 273,
    display: 'inline-block',
    position: 'relative',
    padding: 10,
    marginTop: 20,
    '&:after': {
      content: '""',
      border: '1px dashed #FFE700',
      background: '#000',
      height: 20,
      width: 20,
      borderLeft: 0,
      borderTop: 0,
      transform: 'rotate(-135deg) skew(15deg,15deg)',
      top: -11,
      right: 50,
      position: 'absolute',
    },
  },
}))
const Roadmap = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Container className={classes.containerContent}>
        <LoadedImage src="/images/roadmap/bg.jpg" className={classes.containerContentBg} />
        <img src="/images/logo.svg" className={classes.logo} alt="" />
        <img src="/images/roadmap/circle.png" className={classes.circleIcon} alt="" />
        <div className={classes.roadmapTitle}>ROADMAP</div>
        <Timeline position="alternate">
          {/* part1 */}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className={classes.roadmapPartTitle}>
                <div>Phase 1—‘The CLUB’</div>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent className={classes.emptyContent} />
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <Icon baseClassName="iconfont dj-roadmapDot" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ marginBottom: -35 }}>
              <Typography variant="h6">Dec-2021</Typography>
              <div className={classes.textContent}>
                <p>Project Launch</p>
                <p>Web & Membership NFT design</p>
                <p>Roadmap reveabled</p>
              </div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <Icon baseClassName="iconfont dj-roadmapDot" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6">Jan-2022</Typography>
              <div className={classes.textContent}>
                <p>Community (Discord, Twitter) Starts</p>
                <p>Smart Contract Development</p>
              </div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <Icon baseClassName="iconfont dj-roadmapDot" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6">Apr-2022</Typography>
              <div className={classes.textContent}>
                <p>Whitelists Released</p>
                <p>
                  <img src="/images/roadmap/typographyArrowLeft.png" className={classes.textArrow} alt="" />
                  Offline DJ Meetup
                </p>
              </div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <Icon baseClassName="iconfont dj-roadmapDot" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ marginBottom: 90 }}>
              <Typography variant="h6">Apr- 2022</Typography>
              <div className={classes.textContent}>
                <p>
                  Membership Pass Launch
                  <img
                    src="/images/roadmap/typographyArrowRight.png"
                    className={clsx(classes.textArrow, classes.textArrowRight)}
                    alt=""
                  />
                </p>
                <p>- VIP sale: April 13, 2022 </p>
                <p> - Presale: April 15, 2022 </p>
                <p>- Official Sale: April 20, 2022</p>
              </div>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
        {/* part2 */}
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className={classes.roadmapPartTitle}>
                <div>
                  Phase 2 – ‘The Show’ <img src="/images/roadmap/mouseArrow.png" alt="" />
                </div>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent className={classes.emptyContent} />
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <Icon baseClassName="iconfont dj-roadmapDot" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ marginBottom: -35 }}>
              <Typography variant="h6">Q2 2022</Typography>
              <div className={classes.textContent}>
                <p>•Tokenomics Release—Hold-to-Earn</p>
                <p>•1st Season NFT Mystery Boxes Launch</p>
                <p>
                  <img src="/images/roadmap/typographyArrowLeft.png" className={classes.textArrow} alt="" />
                  •Marketplace Launch
                </p>
              </div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <Icon baseClassName="iconfont dj-roadmapDot" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ marginBottom: 50 }}>
              <Typography variant="h6">Q3 2022</Typography>
              <div className={classes.textContent}>
                <p>Gen1 PFP Avatars Released</p>
                <p>2nd Season NFT Mystery Boxes Launch</p>
                <p>TopDJ Metaverse Launch on Sandbox</p>
              </div>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
        {/* part3 */}
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot className={clsx(classes.roadmapPartTitle, classes.roadmapPartTitle2)}>
                <div>Phase 3 – ‘The TOP DJ Metaverse’</div>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent className={classes.emptyContent} />
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <Icon baseClassName="iconfont dj-roadmapDot" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ marginBottom: -70 }}>
              <Typography variant="h6">Q4 2022</Typography>

              <div className={classes.textContent}>
                <p>3rd Season NFT Mystery Boxes Launch</p>
                <p>Tokens Issuance</p>
                <p>Community to DAO</p>
                <p>
                  <img src="/images/roadmap/typographyArrowLeft.png" className={classes.textArrow} alt="" />
                  VR Music Festival Launch
                </p>
                <p>Offline Music Festival and DJ Private Parties</p>
                <p>Earning Mechanics Development</p>
              </div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <Icon baseClassName="iconfont dj-roadmapDot" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ marginBottom: 190 }}>
              <Typography variant="h6">2023</Typography>
              <div className={classes.textContent}>
                <p>
                  Gen2 3D Avatars for TopDJ Metaverse Released
                  <br />
                  TopDJ Metaverse Launch—a Web3 lifestyle app
                  <br /> with inbuilt Game-Fi elements{' '}
                </p>
                <p>
                  More to come, we are your music gateway to the
                  <img
                    src="/images/roadmap/typographyArrowRight.png"
                    className={clsx(classes.textArrow, classes.textArrowRight)}
                    alt=""
                  />
                  <br /> metaverse
                </p>
              </div>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Container>
    </div>
  )
}

export default Roadmap
