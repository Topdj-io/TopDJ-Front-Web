import React from "react";
import styled from "styled-components";
import { LangType } from "../types";
import SocialLinks from "./SocialLinks";
import LangSelector from "./LangSelector";
interface Props {
  currentLang: string;
  langs: LangType[];
  setLang: (lang: LangType) => void;
}

const StyledPanel = styled.div`
  background: #fff;
  border-radius: 32px;
  display: flex;
  width: 240px;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background: ${({ theme }) => theme.colors.secondary};
`;

const Panel: React.FC<Props> = (props) => {
  const { currentLang, langs, setLang } = props;
  return (
    <StyledPanel>
      <LangSelector position="bottom" currentLang={currentLang} langs={langs} setLang={setLang} />
      <SocialLinks position="bottom" />
    </StyledPanel>
  );
};

export default Panel;
