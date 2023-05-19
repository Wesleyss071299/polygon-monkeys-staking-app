import Head from 'next/head';
import Image from 'next/image';

import { useCallback, useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import {
  COLLECTION_NAME,
  TOKEN_NAME,
  DROPDOWN_OPTIONS,
  LOCKUP_PERIOD_1
} from '../../../constants';
import { DropdownLabel } from '../../components/DropdownLabel';
import { LoadingButton } from '../../components/LoadingButton';
import { useContractContext } from '../../providers/ContractProvider';
import { calcPercentage } from '../../utils/calcPercentage';
import {
  Button,
  ButtonGroup,
  Content,
  GridContainer,
  Header,
  InfoCard,
  StakingInfo,
  TokenContainer
} from './styles';
import 'react-dropdown/style.css';

import 'react-dropdown/style.css';

export default function Stake() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'unstaked' | 'staked'>('unstaked');
  const { isConnected, address } = useAccount();

  const {
    getUnstakedNfts,
    getStakedNftsByLockup,
    unstakedNfts,
    stakedNfts,
    handleStakeNft,
    rewards,
    currentVault,
    setCurrentVault,
    getStakingInfo,
    totalStaked,
    handleUnstakeNft
  } = useContractContext();

  const getNfts = useCallback(async () => {
    await getUnstakedNfts();
  }, [getUnstakedNfts, address]);

  const getStakedNfts = useCallback(async () => {
    await getStakedNftsByLockup();
  }, [getStakedNftsByLockup, address]);

  const getStaking = useCallback(async () => {
    await getStakingInfo();
  }, [getStakingInfo, address]);

  useEffect(() => {
    getNfts();
  }, []);

  useEffect(() => {
    getStakedNfts();
  }, [currentVault]);

  useEffect(() => {
    getStaking();
  }, []);

  const dropdownOptions = DROPDOWN_OPTIONS.map((option) => {
    return {
      value: option.id,
      label: (
        <DropdownLabel
          key={option.id}
          title={`${COLLECTION_NAME} - ${
            option.type === 'RARITY' ? 'CUSTOM' : option.rewardRate
          } $${TOKEN_NAME}`}
        >
          Lockup: {option.lockupPeriod} Days
        </DropdownLabel>
      )
    };
  });

  const handleDropDown = async (value: any, type: string) => {
    const currentOption = DROPDOWN_OPTIONS.find((d) => d.id === value);
    setCurrentVault({
      id: value,
      lockup: currentOption.lockupPeriod,
      type: currentOption.type
    });
  };

  return (
    <>
      <Head>
        <title>{COLLECTION_NAME} Staking</title>
      </Head>
      <Header>
        <div className="collection-info">
          <Image
            src="/logo.png"
            alt={`${COLLECTION_NAME} logo image"`}
            width={130}
            height={130}
          />
        </div>
        <div className="right">
          <ConnectButton />
        </div>
      </Header>
      <Content>
        <StakingInfo>
          <div>
            <InfoCard>
              <h6>Total {COLLECTION_NAME} Staked</h6>
              <strong>{calcPercentage(totalStaked, 4445).toFixed(2)}%</strong>
              <div>
                <span>{totalStaked} / 4445</span>
                <progress value={totalStaked} max={4445} />
              </div>
            </InfoCard>

            <Dropdown
              options={dropdownOptions.sort((a, b) => {
                if (a.value === currentVault.id) return -1;
                if (b.value === currentVault.id) return 1;
                return 0;
              })}
              onChange={(e) => {
                handleDropDown(e.value, currentVault.type);
              }}
              value={currentVault.id}
              className="dropdown"
              controlClassName="dropdown-control"
              placeholderClassName="dropdown-placeholder"
              menuClassName="dropdown-menu"
              arrowClassName="dropdown-arrow"
              placeholder="Change Vault"
            />
          </div>

          {isConnected && (
            <div>
              <InfoCard>
                <h6>My Staked {COLLECTION_NAME}</h6>
                <strong>
                  {String(totalStaked || 0).padStart(2, '0') || '00'}
                </strong>
              </InfoCard>

              <InfoCard>
                <>
                  <h6>Estimated Rewards</h6>
                  <strong>
                    {rewards} ${TOKEN_NAME}
                  </strong>
                </>
              </InfoCard>
            </div>
          )}
        </StakingInfo>
        <ButtonGroup>
          <Button
            isActive={activeTab === 'unstaked'}
            onClick={() => setActiveTab('unstaked')}
            disabled={!isConnected || isLoading}
          >
            Unstaked{' '}
            {!!unstakedNfts && isConnected && `(${unstakedNfts.length})`}
          </Button>
          <Button
            isActive={activeTab === 'staked'}
            onClick={() => setActiveTab('staked')}
            disabled={!isConnected || isLoading}
          >
            Staked {!!stakedNfts && isConnected && `(${stakedNfts.length})`}
          </Button>
          {isConnected && (
            <div className="staking-actions">
              {activeTab === 'unstaked' && (
                <LoadingButton
                  onClick={() => {
                    const tokenIds = unstakedNfts.map((n) => n.tokenId);
                    handleStakeNft(tokenIds);
                  }}
                  isLoading={isLoading}
                >
                  Stake All
                </LoadingButton>
              )}
              {activeTab === 'staked' && (
                <LoadingButton
                  onClick={() => {
                    const tokenIds = stakedNfts.map((n) => n.tokenId);

                    handleUnstakeNft(tokenIds);
                  }}
                  isLoading={isLoading}
                >
                  Unstake All
                </LoadingButton>
              )}
            </div>
          )}
        </ButtonGroup>
        <GridContainer>
          {activeTab === 'unstaked'
            ? isConnected &&
              unstakedNfts.map((token, index) => (
                <TokenContainer
                  key={Math.random() * index}
                  onClick={() => null}
                  // isSelected={selectedNFTS.includes(token.tokenId)}
                >
                  <Image
                    src={token?.image}
                    alt={token?.name}
                    width={200}
                    height={212}
                    priority
                    loader={({ src, width }) => `${src}?w=${width}`}
                  />
                  <h2>{token?.name}</h2>

                  <button
                    onClick={() => handleStakeNft([token.tokenId])}
                    disabled={isLoading}
                  >
                    STAKE
                  </button>
                </TokenContainer>
              ))
            : isConnected &&
              stakedNfts.map((token, index) => (
                <TokenContainer key={Math.random() * index}>
                  <Image
                    src={token.image}
                    alt="token"
                    width={200}
                    height={212}
                    loader={({ src, width }) => `${src}?w=${width}`}
                  />
                  <h2>{token.name}</h2>

                  <button
                    onClick={() => handleUnstakeNft([token.tokenId])}
                    disabled={isLoading}
                  >
                    WITHDRAW
                  </button>
                </TokenContainer>
              ))}
        </GridContainer>
      </Content>
    </>
  );
}
