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

export const createNFTContractGet = () => {
  const web3 = new Web3(
    'https://rpc.ankr.com/polygon/55d123e195f8665b8c5a76f5755a9616ba7452863f8d6f347e2de4821bc346dd'
  );
  return new web3.eth.Contract(NFTABI as any, NFTContractAddress);
};
