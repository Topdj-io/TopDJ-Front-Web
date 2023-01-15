import React from "react";
import styled, { keyframes, DefaultTheme } from "styled-components";
import { MENU_ENTRY_HEIGHT } from "../config";

export interface Props {
  secondary?: boolean;
  isActive?: boolean;
  theme: DefaultTheme;
}

const rainbowAnimation = keyframes`
  0%,
  100% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
`;

const LinkLabel = styled.div<{ isPushed: boolean }>`
  transition: color 0.4s;
  flex-grow: 1;
  font-weight: bold;
`;

const MenuEntry = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: ${({ secondary }) => (secondary ? "0 32px" : "0 16px")};
  font-size: ${({ secondary }) => (secondary ? "14px" : "16px")};
  background-color: ${({ secondary, theme }) => (secondary ? theme.colors.background : "transparent")};
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  &::after {
    position: absolute;
    bottom: 50%;
    left: 0;
    transform: translateY(50%);
    content: "";
    width: 3px;
    transition: all linear 0.2s;
    height: 16px;
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    background: ${({ theme }) => theme.colors.primary};
  }
  ${({ theme }) => theme.mediaQueries.nav} {
    &::after {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 3px;
      width: 30px;
    }
  }
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  svg {
    fill: ${({ theme }) => theme.colors.textSubtle};
  }
  // Safari fix
  flex-shrink: 0;

  &.rainbow {
    background-clip: text;
    animation: ${rainbowAnimation} 3s ease-in-out infinite;
    background: ${({ theme }) => theme.colors.gradients.bubblegum};
    background-size: 400% 100%;
  }
`;
MenuEntry.defaultProps = {
  secondary: false,
  isActive: false,
  role: "button",
};

const LinkLabelMemo = React.memo(LinkLabel, (prev, next) => prev.isPushed === next.isPushed);

export { MenuEntry, LinkLabelMemo as LinkLabel };
