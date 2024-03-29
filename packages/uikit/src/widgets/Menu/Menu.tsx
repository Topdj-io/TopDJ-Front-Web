import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import Overlay from "../../components/Overlay/Overlay";
import Flex from "../../components/Box/Flex";
import { useMatchBreakpoints } from "../../hooks";
import Logo from "./components/Logo";
import Panel from "./components/Panel";
import NavPanel from "./components/NavPane";
import NavPaneAction from "./components/NavPaneAction";
import UserBlock from "./components/UserBlock";
import { NavProps } from "./types";
import Avatar from "./components/Avatar";
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  background: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT - 40}px;
  ${({ theme }) => theme.mediaQueries.xl} {
    border-bottom: 0;
    padding: 0 42px;
    height: ${MENU_HEIGHT}px;
  }
  z-index: 20;
  transform: translate3d(0, 0, 0);
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT - 40}px` : 0)};
  /* transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0); */
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: 0;
    margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  }
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  links,
  profile,
  renderLoginButton,
  children,
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const [isPushed, setIsPushed] = useState(!isMobile);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);

  useEffect(() => {
    // const handleScroll = () => {
    //   const currentOffset = window.pageYOffset;
    //   const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
    //   const isTopOfPage = currentOffset === 0;
    //   // Always show the menu when user reach the top
    //   if (isTopOfPage) {
    //     setShowMenu(true);
    //   }
    //   // Avoid triggering anything at the bottom because of layout shift
    //   else if (!isBottomOfPage) {
    //     if (currentOffset < refPrevOffset.current) {
    //       // Has scroll up
    //       setShowMenu(true);
    //     } else {
    //       // Has scroll down
    //       setShowMenu(false);
    //     }
    //   }
    //   refPrevOffset.current = currentOffset;
    // };
    // const throttledHandleScroll = throttle(handleScroll, 200);
    // window.addEventListener("scroll", throttledHandleScroll);
    // return () => {
    //   window.removeEventListener("scroll", throttledHandleScroll);
    // };
  }, []);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");
  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <Flex alignItems="center">
          <Logo
            isMobile={isMobile}
            isPushed={isPushed}
            togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
            isDark={isDark}
            href={homeLink?.href ?? "/"}
          />
          {!isMobile && (
            <NavPanel
              isPushed={isPushed}
              isMobile={isMobile}
              showMenu={showMenu}
              isDark={isDark}
              toggleTheme={toggleTheme}
              langs={langs}
              setLang={setLang}
              currentLang={currentLang}
              cakePriceUsd={cakePriceUsd}
              pushNav={setIsPushed}
              links={links}
            ></NavPanel>
          )}
        </Flex>
        {renderLoginButton && renderLoginButton()}
        {/* <UserBlock account={account} login={login} logout={logout} /> */}
        {/* <Flex alignItems="center">
          {!isMobile && <NavPaneAction langs={langs} setLang={setLang} currentLang={currentLang} />}
          {isMobile && <UserBlock account={account} login={login} logout={logout} />}
          {profile && <Avatar profile={profile} />}
        </Flex> */}
      </StyledNav>
      <BodyWrapper>
        {isMobile && (
          <Panel
            isPushed={isPushed}
            isMobile={isMobile}
            showMenu={showMenu}
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={setLang}
            currentLang={currentLang}
            cakePriceUsd={cakePriceUsd}
            pushNav={setIsPushed}
            links={links}
          />
        )}
        <Inner isPushed={isPushed} showMenu={showMenu}>
          {children}
        </Inner>
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
