import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { ConnectorNames } from '@kwswap/uikit'
// import { useToast } from 'state/hooks'
import { connectorsByName } from 'utils/web3React'
import { setupNetwork } from 'utils/wallet'
import useToast from 'hooks/useToast'

const useAuth = (showToast = false) => {
  const { activate, deactivate } = useWeb3React()
  const { toastWarning, toastError } = useToast()

  const login = useCallback((connectorID: ConnectorNames) => {
    const connector = connectorsByName[connectorID]
    if (connector) {
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          showToast && toastWarning('Please change to ETH network')
          return
          // 无法切换小狐狸的默认网络，只能提示
          const hasSetup = await setupNetwork()
          if (hasSetup) {
            activate(connector)
          }
        } else {
          // toastError(error.name, error.message)
        }
      })
    } else {
      toastError("Can't find connector")
    }
  }, [])

  return { login, logout: deactivate }
}

export default useAuth
