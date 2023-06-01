import React, { useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import axios from 'axios';
import { useAccount } from 'wagmi';
import Web3 from 'web3';

import { LOCKUP_PERIOD_1 } from '../../constants';
import { api } from '../services/api';
import {
  StakingContractAddress,
  createNFTContract,
  createNFTContractGet,
  createStakingContract
} from '../utils/constants';

const ContractContext = React.createContext({
  getUnstakedNfts: null,
  getStakedNftsByLockup: null,
  handleStakeNft: null,
  unstakedNfts: [],
  stakedNfts: [],
  totalStaked: 0,
  rewards: 0,
  totalStakedPerUser: 0,
  currentVault: {
    id: '0',
    lockup: '0',
    type: 'NORMAL'
  },
  setCurrentVault: null,
  getStakingInfo: null,
  handleUnstakeNft: null,
  stakingInfo: [],
  getStakingInfoInitial: null
});

const ContractProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [nftContract, setNftContract] = useState(createNFTContract());
  const [stakingContract, setStakingContract] = useState(
    createStakingContract()
  );
  const [nftContractGet, setNftContractGet] = useState(createNFTContractGet());

  const [currentVault, setCurrentVault] = useState({
    id: '0',
    lockup: '0',
    type: 'NORMAL'
  });

  const [unstakedNfts, setUnstakedNfts] = useState([]);
  const [stakedNfts, setStakedNfts] = useState([]);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalStakedPerUser, setTotalStakedPerUser] = useState(0);
  const [stakingInfo, setStakingInfo] = useState();

  const [rewards, setRewards] = useState(0);

  const { address } = useAccount();
  // const address = '0x42188149C8bdb07258B61349c286D6C8DeC84EA6';

  useEffect(() => {
    setNftContract(createNFTContract());
    setNftContractGet(createNFTContractGet());
    setStakingContract(createStakingContract());
  }, []);

  const getStakingInfo = useCallback(async () => {
    const { data } = await api.get(`user/${address}`);
    const response = await api.get(`stake`);
    setRewards(data.balanceUser);
    setTotalStakedPerUser(data.stakes.length);
    setTotalStaked(response.data.length);
    setStakingInfo(response.data);
  }, [address]);

  const getStakingInfoInitial = useCallback(async () => {
    const response = await api.get(`stake`);
    setTotalStaked(response.data.length);
    setStakingInfo(response.data);
  }, [address]);

  const getUnstakedNfts = useCallback(async () => {
    if (!nftContract || !address) return;

    const tokens = await nftContractGet.methods.tokensOfOwner(address).call();

    const unstakedResponse = await Promise.all(
      tokens.map(async (nft) => {
        const url = await nftContractGet.methods.tokenURI(nft).call();
        const { data } = await axios.get(
          `https://ipfs.io/ipfs/${url.split('://')[1]}`
        );
        return {
          ...data,
          tokenId: nft
        };
      })
    );

    setUnstakedNfts(unstakedResponse);
  }, [address, nftContract, nftContractGet.methods]);

  const getStakedNftsByLockup = useCallback(async () => {
    const { data } = await api.get(`user/staked/${address}`);
    const stakedResponse = await Promise.all(
      data.map(async (nft) => {
        const url = await nftContractGet.methods.tokenURI(nft.tokenId).call();
        const { data } = await axios.get(
          `https://ipfs.io/ipfs/${url.split('://')[1]}`
        );
        return {
          ...data,
          tokenId: nft.tokenId,
          rarityId: nft.rarityId,
          rarityType: nft.rarityType,
          stakeDate: nft.stakeDate,
          lockup: nft.lockup,
          multiplier: nft.multiplier,
          balance: nft.balance
        };
      })
    );

    setStakedNfts(stakedResponse);
  }, [address, nftContractGet.methods]);

  const handleStakeNft = async (tokenIds: number[]) => {
    console.log(tokenIds);
    try {
      const isApproved = await nftContractGet.methods
        .isApprovedForAll(address, StakingContractAddress)
        .call();

      const { data } = await axios.get(
        'https://gasstation-mainnet.matic.network/v2'
      );

      if (!isApproved) {
        const gas = nftContract.methods
          .setApprovalForAll(StakingContractAddress, true)
          .estimateGas({ from: address });

        const gasFee = data.estimatedBaseFee;

        const gasPrice = Web3.utils.toWei(
          String(Math.floor(gasFee * 2)),
          'Gwei'
        );

        await toast.promise(
          nftContract.methods
            .setApprovalForAll(StakingContractAddress, true)
            .send({ from: address, gas: Number(gas), gasPrice }),
          {
            loading: 'Sending transaction...',
            success: <b>Success</b>,
            error: <b>Something went wrong!.</b>
          }
        );
      }

      const gasFee = data.estimatedBaseFee;

      const gas = await stakingContract.methods
        .stakeToken(tokenIds, Number(currentVault.lockup), currentVault.type)
        .estimateGas({ from: address });

      const gasPrice = Web3.utils.toWei(String(Math.floor(gasFee * 2)), 'Gwei');

      toast.promise(
        stakingContract.methods
          .stakeToken(tokenIds, Number(currentVault.lockup), currentVault.type)
          .send({ from: address, gas: Number(gas), gasPrice })
          .then(() => {
            getUnstakedNfts();
            getStakedNftsByLockup();
            getStakingInfo();
          }),
        {
          loading: 'Sending transaction...',
          success: <b>Success</b>,
          error: <b>Something went wrong!.</b>
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnstakeNft = async (tokenIds: number[]) => {
    try {
      const { data } = await axios.get(
        'https://gasstation-mainnet.matic.network/v2'
      );

      console.log(tokenIds);

      const gasFee = data.estimatedBaseFee;

      const gas = await stakingContract.methods
        .unstakeToken(tokenIds)
        .estimateGas({ from: address });

      const gasPrice = Web3.utils.toWei(String(Math.floor(gasFee * 2)), 'Gwei');

      toast.promise(
        stakingContract.methods
          .unstakeToken(tokenIds)
          .send({ from: address, gas: Number(gas), gasPrice })
          .then(() => {
            getUnstakedNfts();
            getStakedNftsByLockup();
            getStakingInfo();
          }),
        {
          loading: 'Sending transaction...',
          success: <b>Success</b>,
          error: <b>Something went wrong!.</b>
        }
      );
    } catch (error) {
      toast.error('MONKEY Locked');
    }
  };

  return (
    <ContractContext.Provider
      value={{
        getUnstakedNfts,
        getStakedNftsByLockup,
        handleStakeNft,
        unstakedNfts,
        stakedNfts,
        totalStaked,
        rewards,
        currentVault,
        setCurrentVault,
        getStakingInfo,
        handleUnstakeNft,
        totalStakedPerUser,
        stakingInfo,
        getStakingInfoInitial
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => {
  return useContext(ContractContext);
};

export default ContractProvider;
