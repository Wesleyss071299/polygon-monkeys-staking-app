import Image from 'next/image';

import { useCallback, useEffect } from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useContractContext } from '../../providers/ContractProvider';
import { calcPercentage } from '../../utils/calcPercentage';
import { Container, Info, InfoContainer } from './styles';

export default function NotConnected() {
  const { totalStaked, stakingInfo } = useContractContext();

  return (
    <Container>
      <Image src="/logo.png" width={400} height={400} alt="logo" />
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  zIndex: 1
                }
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      style={{
                        backgroundColor: '#edd4fe',
                        borderRadius: 12,
                        border: 'none',
                        fontSize: 15,
                        letterSpacing: 3,
                        fontFamily: 'Bebas Neue, cursive',
                        fontWeight: 700,
                        padding: '15px',
                        cursor: 'pointer',
                        color: '#000',
                        marginTop: 40,
                        zIndex: 1
                      }}
                    >
                      CONNECT WALLET
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div
                    style={{ display: 'flex', gap: 12, backgroundColor: 'red' }}
                  >
                    <button
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              width={12}
                              height={12}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>

                    <button onClick={openAccountModal} type="button">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
      <InfoContainer>
        <Info>
          <span>Total Monkeys Staked</span>
          <h1>{totalStaked}</h1>
        </Info>
        <Info>
          <span>STAKED PER VAULT</span>
          <div>
            <span>
              7 DAYS: {stakingInfo?.filter((s) => s.lockup === 7).length}
            </span>
            <span>
              30 DAYS: {stakingInfo?.filter((s) => s.lockup === 30).length}
            </span>
            <span>
              60 DAYS: {stakingInfo?.filter((s) => s.lockup === 60).length}
            </span>
            <span>
              90 DAYS:{' '}
              {
                stakingInfo?.filter(
                  (s) => s.lockup === 90 && s.type === 'NORMAL'
                ).length
              }
            </span>
            <span>
              RARITY BASED:{' '}
              {
                stakingInfo?.filter(
                  (s) => s.lockup === 90 && s.type === 'RARITY'
                ).length
              }
            </span>
          </div>
        </Info>
        <Info>
          <span>% of Total Staked</span>
          <h1>{calcPercentage(totalStaked, 4445).toFixed(2)}%</h1>
        </Info>
      </InfoContainer>
    </Container>
  );
}
