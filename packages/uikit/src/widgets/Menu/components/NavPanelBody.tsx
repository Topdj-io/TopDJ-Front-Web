import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { SvgProps } from "../../../components/Svg";
import * as IconModule from "../icons";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { PanelProps, PushedProps } from "../types";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Container = styled.div`
  display: flex;
  margin: 0 40px;
`;

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const location = useLocation();

  // Close the menu when a user clicks a link on mobile
  // const handleClick = isMobile ? () => pushNav(false) : undefined;

  return (
    <Container>
      {links.map((entry) => {
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;
        return (
          <MenuEntry key={entry.label} isActive={entry.href === location.pathname} className={calloutClass}>
            <MenuLink href={entry.href}>
              <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel>
            </MenuLink>
          </MenuEntry>
        );
      })}
    </Container>
  );
};

export default PanelBody;
