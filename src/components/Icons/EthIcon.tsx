/*  eslint-disable */

import React from 'react'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

const EthIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon width="24px" height="24px" viewBox="0 0 24 24" {...props}>
      <title>编组 13</title>
      <defs>
        <linearGradient x1="0.058218149%" y1="30.5378578%" x2="98.4619141%" y2="30.5378578%" id="linearGradient-eth1">
          <stop stop-color="#FACDFF" offset="0.058218149%"></stop>
          <stop stop-color="#FFAEAE" offset="24.0105425%"></stop>
          <stop stop-color="#FFF4A6" offset="54.7214944%"></stop>
          <stop stop-color="#9CFFFE" offset="77.1934624%"></stop>
          <stop stop-color="#CBFF92" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="0.058218149%" y1="30.5378578%" x2="98.4619141%" y2="30.5378578%" id="linearGradient-eth2">
          <stop stop-color="#FACDFF" offset="0.058218149%"></stop>
          <stop stop-color="#FFAEAE" offset="24.0105425%"></stop>
          <stop stop-color="#FFF4A6" offset="54.7214944%"></stop>
          <stop stop-color="#9CFFFE" offset="77.1934624%"></stop>
          <stop stop-color="#CBFF92" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="盲盒/未铸造置灰" transform="translate(-1082.000000, -464.000000)">
          <g id="编组-20" transform="translate(1082.000000, 459.000000)">
            <g id="编组-13" transform="translate(0.000000, 5.000000)">
              <rect id="矩形" fill="#D8D8D8" opacity="0" x="0" y="0" width="24" height="24"></rect>
              <g id="编组" transform="translate(5.000000, 1.000000)" fill-rule="nonzero">
                <path
                  d="M7,0 L7,9.0830324 L0,11.125433 L7,0 Z M7,0 L7,9.0830324 L14,11.125433 L7,0 Z M7,22 L7,15.6798339 L0,12.0614145 L7,22 Z M7,22 L7,15.6798339 L14,12.0614145 L7,22 Z"
                  id="形状"
                  fill="url(#linearGradient-eth1)"
                ></path>
                <path
                  d="M0,10.9129566 L7,7.85714286 L7,14.1428571 L0,10.9129566 Z M14,10.9129566 L7,7.85714286 L7,14.1428571 L14,10.9129566 Z"
                  id="形状"
                  fill="url(#linearGradient-eth2)"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  )
}

export default EthIcon
