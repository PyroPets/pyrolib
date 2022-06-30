import { ethers } from 'ethers';
import ABI from '../abi';
import { CONTRACTS } from '../constants';
import { MetrixContract, Transaction } from '../mrx';
import { IERC165 } from '../mrx/interface/IERC165';
import { IERC721 } from '../mrx/interface/IERC721';
import { IERC721Enumerable } from '../mrx/interface/IERC721Enumerable';
import { Provider } from '../provider';
import { PyroColor } from './enum/PyroColor';
import { Auction } from './interface/Aution';
import { Pyro } from './interface/Pyro';

/** Class which can be used to interact with the PyroPets (PYRO) token contract */
export default class PyroCore implements IERC165, IERC721, IERC721Enumerable {
  private core: MetrixContract;
  constructor(provider: Provider) {
    this.core = new MetrixContract(
      CONTRACTS[provider.network].PyroCore,
      provider,
      ABI.PyroCore,
      undefined
    );
  }

  async approve(to: string, tokenId: string): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param addr
   * @param tokenId
   */
  async approveStoking(addr: string, tokenId: string): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  async balanceOf(owner: string): Promise<bigint> {
    const balance = await this.core.call(`balanceOf(address)`, [owner]);
    return !isNaN(Number(balance ? balance.toString() : undefined))
      ? BigInt(balance!.toString())
      : BigInt(0);
  }

  /**
   *
   * @returns
   */
  async baseURI(): Promise<string> {
    const uri = await this.core.call(`baseURI()`, []);
    return uri ? uri.toString() : '';
  }

  /**
   *
   * @param tokenId
   */
  async burn(tokenId: string): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param tokenId
   * @returns
   */
  async canStoke(tokenId: string): Promise<boolean> {
    const can = await this.core.call(`canStoke(uint256)`, [
      tokenId.startsWith('0x') ? tokenId : `0x${tokenId}`
    ]);
    return can ? can.toString() === 'true' : false;
  }

  /**
   *
   * @param donorA
   * @param donorB
   * @returns
   */
  async canStokeWith(donorA: string, donorB: string): Promise<boolean> {
    const can = await this.core.call(`canStokeWith(uint256,uint256)`, [
      donorA.startsWith('0x') ? donorA : `0x${donorA}`,
      donorB.startsWith('0x') ? donorB : `0x${donorB}`
    ]);
    return can ? can.toString() === 'true' : false;
  }

  /**
   *
   * @param tokenId
   * @returns
   */
  async emberRates(tokenId: string): Promise<bigint> {
    const rates = await this.core.call(`emberRates(uint256)`, [
      tokenId.startsWith('0x') ? tokenId : `0x${tokenId}`
    ]);
    return !isNaN(Number(rates ? rates.toString() : undefined))
      ? BigInt(rates!.toString())
      : BigInt(-1);
  }

  /**
   *
   * @returns
   */
  async embers(): Promise<string> {
    const mbrs = await this.core.call(`embers()`, []);
    return mbrs ? mbrs.toString() : ethers.constants.AddressZero;
  }

  /**
   *
   * @param tokenId
   * @param amount
   */
  async feed(tokenId: string, amount: number): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @returns
   */
  async gen0Cap() {
    const cap = await this.core.call(`gen0Cap()`, []);
    return !isNaN(Number(cap ? cap.toString() : undefined))
      ? BigInt(cap!.toString())
      : BigInt(0);
  }

  async gen0Count() {
    const count = await this.core.call(`gen0Count()`, []);
    return !isNaN(Number(count ? count.toString() : undefined))
      ? BigInt(count!.toString())
      : BigInt(0);
  }

  async generationCost() {
    const cost = await this.core.call(`generationCost()`, []);
    return !isNaN(Number(cost ? cost.toString() : undefined))
      ? BigInt(cost!.toString())
      : BigInt(-1);
  }

  async generationOfPyro(tokenId: string) {
    const gen = await this.core.call(`generationOfPyro(uint256)`, [
      tokenId.startsWith('0x') ? tokenId : `0x${tokenId}`
    ]);
    return !isNaN(Number(gen ? gen.toString() : undefined))
      ? BigInt(gen!.toString())
      : BigInt(-1);
  }

  async generationZero(name: string): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  async generationZeroForAddress(
    name: string,
    owner: string
  ): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  async getApproved(tokenId: string): Promise<string> {
    const approved = await this.core.call(`getApproved(uint256)`, [
      tokenId.startsWith('0x') ? tokenId : `0x${tokenId}`
    ]);
    return approved ? approved.toString() : ethers.constants.AddressZero;
  }

  async getPyro(tokenId: string): Promise<Pyro> {
    let pyro: Pyro = {
      donorA: BigInt(0),
      donorB: BigInt(0),
      generation: BigInt(0),
      name: '',
      ignitionTime: BigInt(0),
      nextPyroGenesis: BigInt(0),
      pyroGenesisCount: BigInt(0),
      stokingWith: BigInt(0),
      hunger: 0,
      eyes: 0,
      snout: 0,
      color: 0
    };
    //TODO: get the pyro
    return pyro;
  }

  async getSaleAuction(tokenId: string): Promise<Auction> {
    let auction: Auction = {
      tokenId: ethers.constants.HashZero,
      winningBid: BigInt(0),
      minimumBid: BigInt(0),
      biddingTime: BigInt(0),
      startTime: BigInt(0),
      winningBidder: ethers.constants.AddressZero,
      beneficiaryAddress: ethers.constants.AddressZero,
      ended: true
    };
    //TODO: get the auction
    return auction;
  }

  async getStokingAuction(tokenId: string): Promise<Auction> {
    let auction: Auction = {
      tokenId: ethers.constants.HashZero,
      winningBid: BigInt(0),
      minimumBid: BigInt(0),
      biddingTime: BigInt(0),
      startTime: BigInt(0),
      winningBidder: ethers.constants.AddressZero,
      beneficiaryAddress: ethers.constants.AddressZero,
      ended: true
    };
    //TODO: get the auction
    return auction;
  }

  async ignite(tokenId: string, name: string): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
    const approvedForAll = await this.core.call(
      `isApprovedForAll(address,address)`,
      [owner, operator]
    );
    return approvedForAll ? approvedForAll.toString() === 'true' : false;
  }

  /**
   *
   * @param donorA
   * @param donorB
   */
  async isValidStokingPair(donorA: string, donorB: string): Promise<boolean> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param tokenId
   * @param name
   */
  async lastAte(tokenId: string, name: string): Promise<bigint> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param minter
   */
  async lastGen0Mints(minter: string): Promise<bigint> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param tokenId
   */
  async lastPlayed(tokenId: string): Promise<bigint> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param tokenId
   * @param amount
   */
  async levelUp(tokenId: string, amount: bigint): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  async name(): Promise<string> {
    throw new Error('Method not implemented');
  }

  async ownerOf(tokenId: string): Promise<string> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param tokenId
   */
  async play(tokenId: string): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param tokenId
   */
  async pyroGenesisCooldowns(tokenId: string): Promise<bigint> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param tokenId
   */
  async pyroGenesisCosts(tokenId: string): Promise<bigint> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param tokenId
   */
  async pyroLevel(tokenId: string): Promise<bigint> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param tokenId
   */
  async pyros(tokenId: string): Promise<Pyro> {
    throw new Error('Method not implemented');
  }

  async safeTransferFrom(
    from: string,
    to: string,
    tokenId: string
  ): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  async safeTransferFromData(
    from: string,
    to: string,
    tokenId: string,
    data: string
  ): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }

  /**
   *
   * @returns
   */
  async saleAuction(): Promise<string> {
    const auction = await this.core.call(`saleAuction()`, []);
    return auction ? auction.toString() : ethers.constants.AddressZero;
  }

  async setApprovalForAll(
    operator: string,
    approved: boolean
  ): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param tokenId
   * @param color
   */
  async setColor(tokenId: string, color: PyroColor): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param tokenId
   * @param name
   */
  async setName(tokenId: string, name: string): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param donorA
   * @param donorB
   */
  async stokeWith(donorA: string, donorB: string): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @param tokenId
   */
  async stokingAllowedToAddress(tokenId: string): Promise<string> {
    throw new Error('Method not implemented');
  }

  /**
   *
   * @returns
   */
  async stokingAuction(): Promise<string> {
    const auction = await this.core.call(`stokingAuction()`, []);
    return auction ? auction.toString() : ethers.constants.AddressZero;
  }

  /**
   *
   */
  async stokingBaseCost(): Promise<bigint> {
    throw new Error('Method not implemented');
  }

  async supportsInterface(interfaceId: string): Promise<boolean> {
    throw new Error('Method not implemented');
  }

  async symbol(): Promise<string> {
    throw new Error('Method not implemented');
  }

  async tokenByIndex(index: bigint): Promise<string> {
    throw new Error('Method not implemented');
  }

  async tokenOfOwnerByIndex(owner: string, index: bigint): Promise<string> {
    throw new Error('Method not implemented');
  }

  async tokenURI(tokenId: string): Promise<string> {
    throw new Error('Method not implemented');
  }

  async totalSupply(): Promise<bigint> {
    throw new Error('Method not implemented');
  }

  async transferFrom(
    from: string,
    to: string,
    tokenId: string
  ): Promise<Transaction> {
    throw new Error('Method not implemented');
  }
}
