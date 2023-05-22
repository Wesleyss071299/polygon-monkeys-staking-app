import Web3 from 'web3';

import NFTABI from '../abi/NFT.json';
import STAKINGABI from '../abi/Staking.json';

export const NFTContractAddress = '0xE5c93b6692C03d4279D1A3098e4321254b560f47';
export const StakingContractAddress =
  '0x04613dd392dD49454A73A0923eF821a51909449D';

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
    'https://morning-weathered-fog.matic.discover.quiknode.pro/a28deafbeced08422cba57ed873fc6fddcf65a59/'
  );
  return new web3.eth.Contract(NFTABI as any, NFTContractAddress);
};
