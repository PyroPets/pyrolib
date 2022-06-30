import ABI from '../abi';
import { CONTRACTS } from '../constants';
import { MetrixContract } from '../mrx';
import { Provider } from '../provider';
import { NetworkType } from '../types';

/** Class which can be used to interact with the Embers (MBRS) token contract */
export default class Embers {
  private network: NetworkType;
  private auction: MetrixContract;
  constructor(network: NetworkType, provider: Provider) {
    this.network = network;
    this.auction = new MetrixContract(
      CONTRACTS[network].Embers,
      provider,
      ABI.Embers,
      undefined
    );
  }
  allowance(owner: string, spender: string) {}
  approve(spender: string, amount: string) {}
  balanceOf(owner: string) {}
  base() {}
  burn(amount: bigint) {}
  burnFrom(account: string, amount: bigint) {}
  createEmbers() {}
  decimals() {}
  decreaseAllowance(spender: string, amount: bigint) {}
  increaseAllowance(spender: string, amount: bigint) {}
  minBurn() {}
  mint() {}
  symbol() {}
  totalSupply() {}
  transfer(recipient: string, amount: bigint) {}
  transferFrom(sender: string, recipient: string, amount: bigint) {}
}
