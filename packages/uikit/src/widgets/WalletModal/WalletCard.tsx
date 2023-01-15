import React from "react";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import { connectorLocalStorageKey } from "./config";
import Cookies from "js-cookie";
import styled from "styled-components";
import { Login, Config } from "./types";

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
  mb: string;
}
const StyleButton = styled(Button)`
  background: linear-gradient(270deg, #171719 0%, #2c2c2d 100%);
  border-radius: 2px;
  width: 400px;
  max-width: 100%;
`;
const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss, mb }) => {
  const { title, icon: Icon } = walletConfig;
  return (
    <StyleButton
      width="100%"
      variant="tertiary"
      onClick={() => {
        login(walletConfig.connectorId);
        Cookies.set(connectorLocalStorageKey, walletConfig.connectorId);
        onDismiss();
      }}
      style={{ justifyContent: "space-between" }}
      mb={mb}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Text bold color="text" mr="16px">
        {title}
      </Text>
      <Icon width="32px" />
    </StyleButton>
  );
};

export default WalletCard;
