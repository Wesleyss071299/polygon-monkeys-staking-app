import Web3 from 'web3';

import NFTABI from '../abi/NFT.json';
import STAKINGABI from '../abi/Staking.json';

export const NFTContractAddress = '0x4ad41a445e450fFd2861E30C517859C93eC15e4A';
export const StakingContractAddress =
  '0xb0A3bC84a04eE1eFfB2a67F9403d5E230C7A47E0';

export const createNFTContract = () => {
  const web3 = new Web3(window.ethereum as any);
  return new web3.eth.Contract(NFTABI as any, NFTContractAddress);
};

export const createStakingContract = () => {
  const web3 = new Web3(window.ethereum as any);
  return new web3.eth.Contract(STAKINGABI as any, StakingContractAddress);
};

// export const createNFTContractGet = () => {
//   const web3 = new Web3(
//     'https://morning-weathered-fog.matic.discover.quiknode.pro/a28deafbeced08422cba57ed873fc6fddcf65a59/'
//   );
//   return new web3.eth.Contract(NFTABI as any, NFTContractAddress);
// };

export const createNFTContractGet = () => {
  const web3 = new Web3(
    'https://lively-chaotic-arrow.matic-testnet.discover.quiknode.pro/762d42cf43538bd40ec75f145a3594a00ae1c223/'
  );
  return new web3.eth.Contract(NFTABI as any, NFTContractAddress);
};
