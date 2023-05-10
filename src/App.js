import {Buffer} from 'buffer';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig, useAccount, useNetwork } from 'wagmi';
import { mainnet, polygon, polygonMumbai, optimism, avalanche } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { ConnectButton } from '@rainbow-me/rainbowkit';

// TODO add type() view function to instruct frontend type()="PostV1"
import RootPost from './components/RootPost.js';
import {contracts, interfaces} from './contracts.js';

window.Buffer = window.Buffer || Buffer;

const { chains, provider } = configureChains(
  [polygonMumbai, mainnet, /*polygon,  optimism, avalanche*/],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Nonphysical Systems',
  projectId: '44479b5147daf20eefae164e00f9d8ac',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});


function App() {
  const { chain } = useNetwork();
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton chainStatus="none"></ConnectButton>
        { chain && chain.id !== 80001 && (<p>Invalid chain!</p>)}
        <RootPost contract={contracts.root}></RootPost>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
