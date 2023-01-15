import React, { useState, useEffect } from 'react'
import { HOME_BG_URL, BLINDBOX_LOADING_URL, BLINDBOX_SUCCESS_URL } from 'config/constants/preloadResource'
import { useLocation } from 'react-router-dom'
import RoutePath from 'routes/routePath'

// 暂时无用
const PreloadContextProvider = ({ children, onComplete }) => {
  const { pathname } = useLocation()
  // useEffect(() => {
  //   // @ts-ignore
  //   const queue = new createjs.LoadQueue(false)
  //   if (pathname === RoutePath.HOME) {
  //     queue.loadFile(HOME_BG_URL)
  //   }
  //   // 当开启盲盒的时候再开启
  //   // else if (pathname === RoutePath.MYSTERY_BOX) {
  //   //   queue.loadFile(BLINDBOX_LOADING_URL)
  //   //   queue.loadFile(BLINDBOX_SUCCESS_URL)
  //   // }
  //   else {
  //     onComplete()
  //   }
  //   queue.on('complete', () => {
  //     onComplete()
  //   })
  // }, [pathname])
  return <div>{children}</div>
}

export default PreloadContextProvider
