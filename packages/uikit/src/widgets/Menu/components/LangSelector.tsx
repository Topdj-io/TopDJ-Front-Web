import React from "react";
import { SvgProps } from "../../../components/Svg";
import Text from "../../../components/Text/Text";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { Position } from "../../../components/Dropdown/types";
import Button from "../../../components/Button/Button";
import * as IconModule from "../icons";
import { LangType } from "../types";
import MenuButton from "./MenuButton";

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };
const { LanguageIcon } = Icons;

interface Props {
  currentLang: string;
  langs: LangType[];
  setLang: (lang: LangType) => void;
  position?: Position;
}

const LangSelector: React.FC<Props> = ({ currentLang, langs, position = "top-right", setLang }) => (
  <Dropdown
    position={position}
    target={
      <Button variant="text" startIcon={<LanguageIcon color="textSubtle" width="24px" />} paddingLeft="0">
        <Text color="#fff">{currentLang?.toUpperCase()}</Text>
      </Button>
    }
  >
    {langs.map((lang) => (
      <MenuButton
        key={lang.code}
        fullWidth
        onClick={() => setLang(lang)}
        // Safari fix
        style={{ minHeight: "32px", height: "auto" }}
      >
        {lang.language}
      </MenuButton>
    ))}
  </Dropdown>
);

export default React.memo(LangSelector, (prev, next) => prev.currentLang === next.currentLang);
