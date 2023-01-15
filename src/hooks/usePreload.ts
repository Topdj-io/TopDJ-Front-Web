import React, { useState, useEffect } from 'react'

export const usePreload = (resourceList: string[]) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // @ts-ignore
    const queue = new createjs.LoadQueue(false)
    resourceList.forEach((item) => {
      queue.loadFile(item)
    })
    queue.on('complete', () => {
      setLoading(false)
    })
  }, [])
  return [loading]
}
export default usePreload
