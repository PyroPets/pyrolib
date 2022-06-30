import ABI from '../abi';
import { CONTRACTS } from '../constants';
import { MetrixContract } from '../mrx';
import { Provider } from '../provider';
import { NetworkType } from '../types';

export enum PyroColor {
  NONE = 0,
  PURPLE = 1,
  WHITE = 2,
  RED = 3,
  BLUE = 4,
  PINK = 5,
  GREEN = 6,
  ORANGE = 7
}

/** Class which can be used to interact with the PyroPets (PYRO) token contract */
export default class PyroCore {
  private network: NetworkType;
  private core: MetrixContract;
  constructor(network: NetworkType, provider: Provider) {
    this.network = network;
    this.core = new MetrixContract(
      CONTRACTS[network].PyroCore,
      provider,
      ABI.PyroCore,
      undefined
    );
  }
  approve(to: string, tokenId: bigint) {}
  approveStoking(addr: string, tokenId: bigint) {}
  balanceOf(owner: string) {}
  baseURI() {}
  burn(tokenId: bigint) {}
  canStoke(tokenId: bigint) {}
  canStokeWith(donorA: bigint, donorB: bigint) {}
  emberRates(tokenId: bigint) {}
  embers() {}
  feed(tokenId: bigint, amount: number) {}
  gen0Cap() {}
  gen0Count() {}
  generationCost() {}
  generationOfPyro(tokenId: bigint) {}
  generationZero(name: string) {}
  generationZeroForAddress(name: string, owner: string) {}
  getApproved(tokenId: bigint) {}
  getPyro(tokenId: bigint) {}
  getSaleAuction(tokenId: bigint) {}
  getStokingAuction(tokenId: bigint) {}
  ignite(tokenId: bigint, name: string) {}
  isApprovedForAll(owner: string, operator: string) {}
  isValidStokingPair(donorA: bigint, donorB: bigint) {}
  lastAte(tokenId: bigint, name: string) {}
  lastGen0Mints(minter: string) {}
  lastPlayed(tokenId: bigint) {}
  levelUp(tokenId: bigint, amount: bigint) {}
  name() {}
  ownerOf(tokenId: bigint) {}
  play(tokenId: bigint) {}
  pyroGenesisCooldowns(tokenId: bigint) {}
  pyroGenesisCosts(tokenId: bigint) {}
  pyroLevel(tokenId: bigint) {}
  pyros(tokenId: bigint) {}
  safeTransferFrom(from: string, to: string, tokenId: bigint) {}
  saleAuction() {}
  setApprovalForAll(operator: string, approved: boolean) {}
  setColor(tokenId: bigint, color: PyroColor) {}
  setName(tokenId: bigint, name: string) {}
  stokeWith(donorA: bigint, donorB: bigint) {}
  stokingAllowedToAddress(tokenId: bigint) {}
  stokingAuction() {}
  stokingBaseCost() {}
  supportsInterface(interfaced: string) {}
  symbol() {}
  tokenByIndex(index: bigint) {}
  tokenOfOwnerByIndex(owner: string, index: bigint) {}
  tokenURI() {}
  totalSupply() {}
  transferFrom(from: string, to: string, tokenId: bigint) {}
}
