import React from "react";
import styled from "styled-components";
import PanelBody from "./PanelBody";
import PanelFooter from "./PanelFooter";
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "../config";
import { PanelProps, PushedProps } from "../types";
import NavPanelBody from "./NavPanelBody";
import CakePrice from "./CakePrice";
interface Props extends PanelProps, PushedProps {
  showMenu: boolean;
  isMobile: boolean;
}

const StyledPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
`;

const Panel: React.FC<Props> = (props) => {
  return (
    <StyledPanel>
      {/* <CakePrice cakePriceUsd={props.cakePriceUsd} /> */}
      <NavPanelBody {...props}></NavPanelBody>
      <div>{props.children}</div>
    </StyledPanel>
  );
};

export default Panel;
