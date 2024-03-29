import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 44 44" {...props}>
      <title>logo备份</title>
      <defs>
        <linearGradient x1="-0.00825082508%" y1="50.0030695%" x2="100.006601%" y2="50.0030695%" id="linearGradient-1">
          <stop stop-color="#0C0C0C" offset="0%"></stop>
          <stop stop-color="#242426" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="49.9130188%" y1="87.8441677%" x2="50.6490132%" y2="3.52779869%" id="linearGradient-2">
          <stop stop-color="#00FF1D" offset="0%"></stop>
          <stop stop-color="#00FFC0" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="文件" transform="translate(-100.000000, -1547.000000)">
          <g id="logo备份" transform="translate(100.000000, 1547.000000)">
            <rect id="矩形" fill="#D8D8D8" opacity="0" x="0" y="0" width="44" height="44"></rect>
            <g id="logo-" transform="translate(5.000000, 0.000000)" fill-rule="nonzero">
              <path
                d="M16.5000646,42.9999479 C7.38633986,42.9999479 -0.0252392226,35.6019385 6.4600019e-05,26.5182543 C0.0254982856,17.4345702 7.53904024,10.1299139 16.6595952,10.1299139 L19.236963,10.1299139 L19.2306209,0 L32.99317,0 L33,27.6743066 C33,27.6942301 33,27.7141537 33,27.7340773 C32.7399703,31.7508607 30.9997713,35.3983295 28.1009033,38.2507997 C25.0186839,41.3027122 20.8460839,43.0108712 16.5000646,42.9999479 Z M16.5000648,11.8384804 C8.34791321,11.8384804 1.7178869,18.44727 1.7178869,26.5624749 C1.7178869,34.6776798 8.35279182,41.2888992 16.5000648,41.2888992 C24.5938719,41.2895035 31.1831403,34.8065337 31.2822426,26.7451885 L31.2822426,26.5551858 L31.2778519,1.71051026 L20.9469146,1.71051026 L20.9537447,11.8384804 L16.5000648,11.8384804 Z"
                id="形状"
                fill="#FFFFFF"
              ></path>
              <path
                d="M21.2787679,1.48275862 L21.2855446,11.5377252 L16.8666667,11.5377252 C8.77821782,11.5377252 2.2,18.0988779 2.2,26.1555875 C2.2,34.2122971 8.78305831,40.7758621 16.8666667,40.7758621 C24.897227,40.7764621 31.4350054,34.3402222 31.5333333,26.3369841 L31.5333333,26.148351 L31.5289769,1.48275862 L21.2787679,1.48275862 Z"
                id="路径"
                fill="url(#linearGradient-1)"
              ></path>
              <path
                d="M16.8651566,0 L16.8651566,25.5505287 L8.8,25.5505287 C8.90436539,29.8361645 12.3210164,33.2546397 16.5,33.2546397 C20.6789836,33.2546397 24.0956346,29.8361645 24.2,25.5505287 L24.2,0 L16.8651566,0 Z"
                id="路径"
                fill="url(#linearGradient-2)"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </Svg>
  );
};

export default Icon;
