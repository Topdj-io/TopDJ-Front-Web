import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LogoIcon } from "../../../components/Svg";
import Flex from "../../../components/Box/Flex";
import { HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText } from "../icons";
import MenuButton from "./MenuButton";

interface Props {
  isPushed: boolean;
  isDark: boolean;
  togglePush: () => void;
  isMobile: boolean;
  href: string;
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 156px;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    }
  }
`;
// 自适应媒体查询

const Logo: React.FC<Props> = ({ isPushed, togglePush, isDark, isMobile, href }) => {
  const isAbsoluteUrl = href.startsWith("http");
  const innerLogo = (
    <>
      <LogoIcon className="mobile-icon" />
      <LogoWithText className="desktop-icon" isDark={isDark} />
    </>
  );
  return (
    <Flex>
      {isMobile && (
        <MenuButton aria-label="Toggle menu" onClick={togglePush} mr="12px">
          {isPushed ? (
            <HamburgerCloseIcon width="32px" color="primary" />
          ) : (
            <HamburgerIcon width="32px" color="primary" />
          )}
        </MenuButton>
      )}
      {isAbsoluteUrl ? (
        <StyledLink as="a" href={href} aria-label="Pancake home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink as="a" href={href}  aria-label="Pancake home page">
          {innerLogo}
        </StyledLink>
      )}
    </Flex>
  );
};

export default React.memo(
  Logo,
  (prev, next) => prev.isMobile === next.isMobile && prev.isPushed === next.isPushed && prev.isDark === next.isDark
);
