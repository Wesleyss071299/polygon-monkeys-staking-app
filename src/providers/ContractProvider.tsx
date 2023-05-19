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
  currentVault: {
    id: '1',
    lockup: '7',
    type: 'NORMAL'
  },
  setCurrentVault: null,
  getStakingInfo: null,
  handleUnstakeNft: null
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
    id: '1',
    lockup: LOCKUP_PERIOD_1,
    type: 'NORMAL'
  });

  const [unstakedNfts, setUnstakedNfts] = useState([]);
  const [stakedNfts, setStakedNfts] = useState([]);
  const [totalStaked, setTotalStaked] = useState(0);
  const [rewards, setRewards] = useState(0);

  const { address } = useAccount();
  // const address = '0x0c84ff9cd768dfaf659349d6f450d7e029f2817e';

  useEffect(() => {
    setNftContract(createNFTContract());
    setNftContractGet(createNFTContractGet());
    setStakingContract(createStakingContract());
  }, []);

  useEffect(() => {
    console.log(currentVault);
  }, [currentVault]);

  const getStakingInfo = useCallback(async () => {
    const { data } = await api.get(`user/${address}`);
    setRewards(data.balance);
    setTotalStaked(data.stakes.length);
  }, []);

  const getUnstakedNfts = useCallback(async () => {
    if (!nftContract || !address) return;

    const nftBalance = await nftContractGet.methods.balanceOf(address).call();

    // const tokens = await nftContractGet.methods.tokensOfOwner(address).call();
    // const tokens = await nftContractGet.methods
    //   .tokenOfOwnerByIndex(address)
    //   .call();

    const arr = new Array(Number(nftBalance)).fill(0);

    const unstakedResponse = await Promise.all(
      arr.map(async (_nft, index) => {
        const tokenId = await nftContractGet.methods
          .tokenOfOwnerByIndex(address, index)
          .call();
        const url = await nftContractGet.methods.tokenURI(tokenId).call();
        const { data } = await axios.get(
          `https://ipfs.io/ipfs/${url.split('://')[1]}`
        );
        return {
          ...data,
          tokenId: tokenId
        };
      })
    );

    setUnstakedNfts(unstakedResponse);
  }, [address, nftContract, nftContractGet.methods]);

  const getStakedNftsByLockup = useCallback(async () => {
    const { data } = await api.get(
      `user/staked/${address}/${currentVault.lockup}/${currentVault.type}`
    );
    const stakedResponse = await Promise.all(
      data.map(async (nft) => {
        const url = await nftContractGet.methods.tokenURI(nft.tokenId).call();
        const { data } = await axios.get(
          `https://ipfs.io/ipfs/${url.split('://')[1]}`
        );
        return {
          ...data,
          tokenId: nft.tokenId
        };
      })
    );

    setStakedNfts(stakedResponse);
  }, [address, currentVault.lockup, currentVault.type, nftContractGet.methods]);

  const handleStakeNft = async (tokenIds: number[]) => {
    const isApproved = await nftContractGet.methods
      .isApprovedForAll(address, StakingContractAddress)
      .call();

    if (!isApproved) {
      await toast.promise(
        nftContract.methods
          .setApprovalForAll(StakingContractAddress, true)
          .send({ from: address }),
        {
          loading: 'Sending transaction...',
          success: <b>Success</b>,
          error: <b>Something went wrong!.</b>
        }
      );
    }

    const { data } = await axios.get(
      'https://gasstation-mainnet.matic.network/v2'
    );

    const gasFee = data.fast.maxPriorityFee;

    const gas = await stakingContract.methods
      .stakeToken(tokenIds, Number(currentVault.lockup), currentVault.type)
      .estimateGas({ from: address });

    const gasPrice = Web3.utils.toWei(String(Math.floor(gasFee)), 'Gwei');

    toast.promise(
      stakingContract.methods
        .stakeToken(tokenIds, Number(currentVault.lockup), currentVault.type)
        .send({ from: address, gas: gas, gasPrice })
        .then(() => {
          getUnstakedNfts();
          getStakedNftsByLockup();
        }),
      {
        loading: 'Sending transaction...',
        success: <b>Success</b>,
        error: <b>Something went wrong!.</b>
      }
    );
  };

  const handleUnstakeNft = async (tokenIds: number[]) => {
    const { data } = await axios.get(
      'https://gasstation-mainnet.matic.network/v2'
    );

    console.log(tokenIds);

    const gasFee = data.fast.maxPriorityFee;

    const gas = await stakingContract.methods
      .unstakeToken(tokenIds)
      .estimateGas({ from: address });

    const gasPrice = Web3.utils.toWei(String(Math.floor(gasFee)), 'Gwei');

    toast.promise(
      stakingContract.methods
        .unstakeToken(tokenIds)
        .send({ from: address, gas: gas, gasPrice })
        .then(() => {
          getUnstakedNfts();
          getStakedNftsByLockup();
        }),
      {
        loading: 'Sending transaction...',
        success: <b>Success</b>,
        error: <b>Something went wrong!.</b>
      }
    );
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
        handleUnstakeNft
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
