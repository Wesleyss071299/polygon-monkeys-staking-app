import { useAccount } from 'wagmi';

import NotConnected from '../containers/NotConnected ';
import Stake from '../containers/Stake';

export default function Home() {
  const { isConnected } = useAccount();
  return isConnected ? <Stake /> : <NotConnected />;
}
