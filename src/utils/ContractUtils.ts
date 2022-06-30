import { CONTRACTS } from '../constants';
import { NetworkType } from '../types/NetworkType';

const getPyroCoreAddress = (network: NetworkType) => {
  return CONTRACTS[network].PyroCore;
};

export { getPyroCoreAddress };
