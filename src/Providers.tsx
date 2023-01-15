import React from 'react'
import { ModalProvider } from '@kwswap/uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import { getLibrary } from 'utils/web3React'
import { SnackbarProvider } from 'notistack'
import { LanguageProvider } from 'contexts/Localization'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { BlockContextProvider } from 'contexts/BlockContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import MuiThemeContextProvider from 'contexts/MuiThemeContext'
import SnackbarContextProvider from 'contexts/SnackbarContext'
import store from 'state'

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ThemeContextProvider>
          <MuiThemeContextProvider>
            <SnackbarContextProvider>
              <LanguageProvider>
                <BlockContextProvider>
                  <RefreshContextProvider>
                    <ModalProvider>{children}</ModalProvider>
                  </RefreshContextProvider>
                </BlockContextProvider>
              </LanguageProvider>
            </SnackbarContextProvider>
          </MuiThemeContextProvider>
        </ThemeContextProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
