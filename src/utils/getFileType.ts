import { FileType } from 'config/constants/fileType'

const imgTypeList = ['png', 'jpg', 'gif', 'jpeg', 'nmp']
const videoTypeList = ['mp4']
const audioFileType = ['mp3']
export const getFileType = (url: string) => {
  // 获取最后一个.的位置
  const index = url.lastIndexOf('.')
  // 获取后缀
  const ext = url.substr(index + 1)
  if (imgTypeList.indexOf(ext) > -1) {
    return FileType.IMAGE
  } else if (videoTypeList.indexOf(ext) > -1) {
    return FileType.VIDEO
  } else if (audioFileType.indexOf(ext) > -1) {
    return FileType.AUDIO
  }
  return null
}
export default getFileType
