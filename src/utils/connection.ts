import { Connection, clusterApiUrl } from '@solana/web3.js';

const mainNet = new Connection(clusterApiUrl('mainnet-beta'));

const genesysRpc = new Connection(
  'https://cold-serene-darkness.solana-mainnet.quiknode.pro/d0dbd43918689a106ee877daddbfbb0b1245fd75/',
  'confirmed'
);

export { mainNet, genesysRpc };
