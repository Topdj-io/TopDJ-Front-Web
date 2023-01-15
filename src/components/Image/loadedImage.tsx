import React, { useState } from 'react'

const LoadedImage = (props) => {
  const [loaded, setLoaded] = useState(false)
  const prop = {...props}
  return (
    <img
      {...prop}
      alt=""
      style={{ opacity: loaded ? 1 : 0 }}
      onLoad={() => {
        setLoaded(true)
        prop?.onLoad?.()
      }}
    />
  )
}

export default LoadedImage
