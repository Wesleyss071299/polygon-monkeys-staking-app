import '@rainbow-me/rainbowkit/styles.css';

import { AppProps } from 'next/app';

import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ThemeProvider } from 'styled-components';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import ContractProvider from '../providers/ContractProvider';
import { GlobalStyles } from '../styles/global';
import { theme } from '../styles/theme';

Modal.setAppElement('#modal-portal');

const { chains, provider } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <ThemeProvider theme={theme}>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
              <ContractProvider>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    className: '',
                    style: {
                      border: '1px solid #2e2e2e',
                      color: '#FFFFFF',
                      backgroundColor: '#000000'
                    }
                  }}
                />
                <GlobalStyles />
                <Component {...pageProps} />
                <Toaster position="top-right" />
              </ContractProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </ThemeProvider>
      ) : null}
    </>
  );
}
