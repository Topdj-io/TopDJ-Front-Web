// @ts-nocheck
/* eslint-disable */
import React, { useEffect } from 'react'
import Particles from 'react-tsparticles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  container: {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
    '& canvas': {
      height: '100%',
      width: '100%',
    },
  },
})
const Particle = () => {
  const classes = useStyles()
  useEffect(() => {
    window.requestAnimFrame = (function () {
      return window.requestAnimationFrame
    })()
    var canvas = document.getElementById('space')
    var c = canvas.getContext('2d')
    var numStars = 1000
    var radius = '0.' + Math.floor(Math.random() * 9) + 1
    var focalLength = canvas.width // * 2
    var warp = 0
    var centerX, centerY
    var stars = [],
      star
    var i
    var animate = true
    initializeStars()
    function executeFrame() {
      if (animate) requestAnimFrame(executeFrame)
      moveStars()
      drawStars()
    }
    function initializeStars() {
      centerX = canvas.width / 2
      centerY = canvas.height / 2
      stars = []
      for (i = 0; i < numStars; i++) {
        star = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * canvas.width,
          o: '0.' + Math.floor(Math.random() * 99) + 1,
        }
        stars.push(star)
      }
    }
    function moveStars() {
      for (i = 0; i < numStars; i++) {
        star = stars[i]
        star.z--
        if (star.z <= 0) {
          star.z = canvas.width
        }
      }
    }
    function drawStars() {
      var pixelX, pixelY, pixelRadius
      // Resize to the screen
      if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        initializeStars()
      }
      if (warp == 0) {
        c.fillStyle = 'rgba(0,0,0,1)'
        c.fillRect(0, 0, canvas.width, canvas.height)
      }

      c.fillStyle = 'rgba(209, 255, 255, 1)'
      for (i = 0; i < numStars; i++) {
        star = stars[i]
        pixelX = (star.x - centerX) * (focalLength / star.z)
        pixelX += centerX
        pixelY = (star.y - centerY) * (focalLength / star.z)
        pixelY += centerY
        pixelRadius = 1 * (focalLength / star.z)
        pixelRadius > 1 && (pixelRadius = 0.8) // 过滤大的

        c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius)
        c.fillStyle = `rgba(255, 255, 255, 1)`
        // c.fill()
      }
    }
    // document.getElementById('warp').addEventListener('click', function (e) {
    //   window.c.beginPath()
    //   window.c.clearRect(0, 0, window.canvas.width, window.canvas.height)
    //   window.warp = warp ? 0 : 1
    //   executeFrame()
    // })
    executeFrame()
  }, [])
  return (
    <div className={classes.container}>
      <canvas id="space" />
    </div>
  )
}

export default Particle