export const getVideoBase64: (url: string) => Promise<string> = (url: string) => {
  return new Promise((resolve) => {
    let dataURL = ''
    const video = document.createElement('video')
    video.setAttribute('crossOrigin', 'anonymous') // 处理跨域
    video.setAttribute('src', url)
    video.setAttribute('width', '400')
    video.setAttribute('height', '240')
    video.setAttribute('preload', 'auto')
    video.currentTime = 1 // 第几秒
    video.addEventListener('loadeddata', () => {
      const canvas = document.createElement('canvas')
      const { width, height } = video // canvas的尺寸和图片一样

      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(video, 0, 0, width, height) // 绘制canvas
      dataURL = canvas.toDataURL('image/jpeg') // 转换为base64
      resolve(dataURL)
    })
  })
}

export default getVideoBase64
