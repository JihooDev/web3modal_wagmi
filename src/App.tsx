import React, { useEffect } from 'react';
import './App.css';
import { createWeb3Modal, defaultWagmiConfig, useWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { goerli, mainnet } from 'viem/chains';
import { publicProvider } from 'wagmi/providers/public';
import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

const projectId: string = process.env.REACT_APP_WEB3_PROJECT_ID || '';

const metaData = {
  name: "Web3Modal",
  description: "Hoo",
  url: "http://localhost:3000",
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const { chains, publicClient } = configureChains(
  [mainnet, goerli],
  [walletConnectProvider({ projectId }), publicProvider()]
)

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata: metaData } }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({ chains, options: { appName: metaData.name } })
  ],
  publicClient
})

createWeb3Modal({ wagmiConfig, projectId, chains });

function App() {

  const { open, close } = useWeb3Modal();

  useEffect(() => {
    open()
  }, [])

  return (
    <WagmiConfig config={wagmiConfig}>
      <div className="App">
        <w3m-button />
      </div>
    </WagmiConfig>
  );
}

export default App;
