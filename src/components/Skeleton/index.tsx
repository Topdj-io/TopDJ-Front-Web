import React from 'react'
import { Skeleton as MuiSkeleton, SkeletonProps } from '@mui/material'
import { styled } from '@mui/styles'

const StyledMuiSkeleton = styled(MuiSkeleton)({
  '&.MuiSkeleton-text': {
    height: 40,
  },
})

interface SkeletonPropsType extends SkeletonProps {
  rows?: number
}
const Skeleton = ({ rows, ...rest }: SkeletonPropsType) => {
  return rows ? (
    <>
      {new Array(rows).fill('').map((item, index) => (
        <StyledMuiSkeleton key={index} {...rest} />
      ))}
    </>
  ) : (
    <StyledMuiSkeleton {...rest} />
  )
}

export default Skeleton
