import { useCallback, useEffect } from 'react';

import { useAccount } from 'wagmi';

import NotConnected from '../containers/NotConnected ';
import Stake from '../containers/Stake';
import { useContractContext } from '../providers/ContractProvider';

export default function Home() {
  const { isConnected, address } = useAccount();
  const { getStakingInfoInitial } = useContractContext();

  const getStaking = useCallback(async () => {
    await getStakingInfoInitial();
  }, [getStakingInfoInitial, address]);

  useEffect(() => {
    getStaking();
  }, []);

  return isConnected ? <Stake /> : <NotConnected />;
}
