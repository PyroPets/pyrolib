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
    const tx = await this.core.send('approve(address,uint256)', [to, tokenId]);
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Approve an address to stoke a specific pyro
   * @param addr approved stoker
   * @param tokenId the pyro tokenId
   */
  async approveStoking(addr: string, tokenId: string): Promise<Transaction> {
    const tx = await this.core.send('approveStoking(address,uint256)', [
      addr,
      tokenId
    ]);
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async balanceOf(owner: string): Promise<bigint> {
    const balance = await this.core.call(`balanceOf(address)`, [owner]);
    return !isNaN(Number(balance ? balance.toString() : undefined))
      ? BigInt(balance!.toString())
      : BigInt(0);
  }

  /**
   * Returns the base URI for the PYRO token
   */
  async baseURI(): Promise<string> {
    const uri = await this.core.call(`baseURI()`, []);
    return uri ? uri.toString() : '';
  }

  /**
   * Permanently destroy the PYRO token
   * @param tokenId the pyro tokenId
   */
  async burn(tokenId: string): Promise<Transaction> {
    const tx = await this.core.send('burn(uint256)', [tokenId]);
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Returns if the pyro can stoke
   * @param tokenId the pyro tokenId
   */
  async canStoke(tokenId: string): Promise<boolean> {
    const can = await this.core.call(`canStoke(uint256)`, [
      tokenId.startsWith('0x') ? tokenId : `0x${tokenId}`
    ]);
    return can ? can.toString() === 'true' : false;
  }

  /**
   * Returns if the two donors can stoke
   * @param donorA pyro tokenId for donorA
   * @param donorB pyro tokenId for donorB
   */
  async canStokeWith(donorA: string, donorB: string): Promise<boolean> {
    const can = await this.core.call(`canStokeWith(uint256,uint256)`, [
      donorA.startsWith('0x') ? donorA : `0x${donorA}`,
      donorB.startsWith('0x') ? donorB : `0x${donorB}`
    ]);
    return can ? can.toString() === 'true' : false;
  }

  /**
   * Returns the rate at which MBRS are created by playing with the pyro
   * @param tokenId the id of the pyro
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
   * Returns the contract address for MBRS token
   */
  async embers(): Promise<string> {
    const mbrs = await this.core.call(`embers()`, []);
    return mbrs ? mbrs.toString() : ethers.constants.AddressZero;
  }

  /**
   * Feeds a pyro, must be between 1-255 units of hunger
   * @param tokenId the pyro tokenId
   * @param amount units of hunger to replenish
   */
  async feed(tokenId: string, amount: number): Promise<Transaction> {
    const tx = await this.core.send('feed(uint256,uint8)', [
      tokenId,
      `0x${BigInt(amount).toString(16)}`
    ]);
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Returns the cap for generation 0 pyros
   */
  async gen0Cap(): Promise<bigint> {
    const cap = await this.core.call(`gen0Cap()`, []);
    return !isNaN(Number(cap ? cap.toString() : undefined))
      ? BigInt(cap!.toString())
      : BigInt(0);
  }

  /**
   * Returns the current count of generation 0 pyros
   */
  async gen0Count(): Promise<bigint> {
    const count = await this.core.call(`gen0Count()`, []);
    return !isNaN(Number(count ? count.toString() : undefined))
      ? BigInt(count!.toString())
      : BigInt(0);
  }

  /**
   * Returns the cost of generation
   */
  async generationCost(): Promise<bigint> {
    const cost = await this.core.call(`generationCost()`, []);
    return !isNaN(Number(cost ? cost.toString() : undefined))
      ? BigInt(cost!.toString())
      : BigInt(-1);
  }

  /**
   * Returns the generation of a pyro
   * @param tokenId the pyro tokenId
   */
  async generationOfPyro(tokenId: string): Promise<bigint> {
    const gen = await this.core.call(`generationOfPyro(uint256)`, [
      tokenId.startsWith('0x') ? tokenId : `0x${tokenId}`
    ]);
    return !isNaN(Number(gen ? gen.toString() : undefined))
      ? BigInt(gen!.toString())
      : BigInt(-1);
  }

  /**
   * Generate a new generation 0 pyro
   * @param name the name of the new pyro
   */
  async generationZero(name: string): Promise<Transaction> {
    const tx = await this.core.send('generationZero(string)', [name]);
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Generate a new generation 0 pyro for an address
   * @param name the name of the new pyro
   * @param owner the owner of the pyro
   */
  async generationZeroForAddress(
    name: string,
    owner: string
  ): Promise<Transaction> {
    const tx = await this.core.send(
      'generationZeroForAddress(string,address)',
      [name, owner]
    );
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async getApproved(tokenId: string): Promise<string> {
    const approved = await this.core.call(`getApproved(uint256)`, [
      tokenId.startsWith('0x') ? tokenId : `0x${tokenId}`
    ]);
    return approved ? approved.toString() : ethers.constants.AddressZero;
  }

  /**
   * Returns a Pyro object
   * @param tokenId the pyro tokenId
   */
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
    const p = await this.core.call('getPyro(uint256)', [tokenId]);
    if (p && p.length === 12) {
      pyro.donorA = BigInt(p[0].toString());
      pyro.donorB = BigInt(p[1].toString());
      pyro.generation = BigInt(p[2].toString());
      pyro.name = p[3].toString();
      pyro.ignitionTime = BigInt(p[4].toString());
      pyro.nextPyroGenesis = BigInt(p[5].toString());
      pyro.pyroGenesisCount = BigInt(p[6].toString());
      pyro.stokingWith = BigInt(p[7].toString());
      pyro.hunger = Number(p[8].toString());
      pyro.eyes = Number(p[7].toString());
      pyro.snout = Number(p[10].toString());
      pyro.color = Number(p[11].toString());
    }
    return pyro;
  }

  /**
   * Returns a SaleAuction for a given pyro
   * @param tokenId the pyro tokenId
   */
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
    const ac = await this.core.call('getSaleAuction(uint256)', [tokenId]);
    if (ac && ac.length === 8) {
      auction.tokenId = `0x${BigInt(ac[0].toString()).toString(16)}`;
      auction.winningBid = BigInt(ac[1].toString());
      auction.minimumBid = BigInt(ac[2].toString());
      auction.biddingTime = BigInt(ac[3].toString());
      auction.startTime = BigInt(ac[4].toString());
      auction.winningBidder = ac[5].toString();
      auction.beneficiaryAddress = ac[6].toString();
      auction.ended = ac[7].toString() === 'true';
    }
    return auction;
  }

  /**
   * Returns a StokingAuction for a given pyro
   * @param tokenId the pyro tokenId
   */
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
    const ac = await this.core.call('getStokingAuction(uint256)', [tokenId]);
    if (ac && ac.length === 8) {
      auction.tokenId = `0x${BigInt(ac[0].toString()).toString(16)}`;
      auction.winningBid = BigInt(ac[1].toString());
      auction.minimumBid = BigInt(ac[2].toString());
      auction.biddingTime = BigInt(ac[3].toString());
      auction.startTime = BigInt(ac[4].toString());
      auction.winningBidder = ac[5].toString();
      auction.beneficiaryAddress = ac[6].toString();
      auction.ended = ac[7].toString() === 'true';
    }
    return auction;
  }

  /**
   * Ignite a new pyro
   * @param tokenId the pyro tokenId
   * @param name the name of the new pyro
   */
  async ignite(tokenId: string, name: string): Promise<Transaction> {
    const tx = await this.core.send('ignite(uint256,string)', [tokenId, name]);
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
    const approvedForAll = await this.core.call(
      `isApprovedForAll(address,address)`,
      [owner, operator]
    );
    return approvedForAll ? approvedForAll.toString() === 'true' : false;
  }

  /**
   * Returns whether 2 pyros are a valid stoking pair
   * @param donorA pyro tokenId for donorA
   * @param donorB pyro tokenId for donorB
   */
  async isValidStokingPair(donorA: string, donorB: string): Promise<boolean> {
    const valid = await this.core.call(`isValidStokingPair(uint256,uint256)`, [
      donorA,
      donorB
    ]);
    return valid ? valid.toString() === 'true' : false;
  }

  /**
   * Returns the last time a pyro ate
   * @param tokenId the pyro tokenId
   */
  async lastAte(tokenId: string): Promise<bigint> {
    const ate = await this.core.call(`lastAte(uint256)`, [tokenId]);
    return !isNaN(Number(ate ? ate.toString() : undefined))
      ? BigInt(ate!.toString())
      : BigInt(-1);
  }

  /**
   * Returns the last time an address minted a generation 0 pyro
   * @param minter the address which minted
   */
  async lastGen0Mints(minter: string): Promise<bigint> {
    const minted = await this.core.call(`lastGen0Mints(address)`, [minter]);
    return !isNaN(Number(minted ? minted.toString() : undefined))
      ? BigInt(minted!.toString())
      : BigInt(-1);
  }

  /**
   *
   * @param tokenId the pyro tokenId
   */
  async lastPlayed(tokenId: string): Promise<bigint> {
    const played = await this.core.call(`lastPlayed(uint256)`, [tokenId]);
    return !isNaN(Number(played ? played.toString() : undefined))
      ? BigInt(played!.toString())
      : BigInt(-1);
  }

  /**
   * Burn MBRS tokens in exchange for levels
   * @param tokenId the pyro tokenId
   * @param amount amount of levels to add
   */
  async levelUp(tokenId: string, amount: bigint): Promise<Transaction> {
    const tx = await this.core.send('levelUp(uint256,uint256)', [
      tokenId,
      `0x${amount.toString(16)}`
    ]);
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async name(): Promise<string> {
    const n = await this.core.call(`name()`, []);
    return n ? n.toString() : '';
  }

  async ownerOf(tokenId: string): Promise<string> {
    const owner = await this.core.call(`ownerOf(uint256)`, [tokenId]);
    return owner ? owner.toString() : ethers.constants.AddressZero;
  }

  /**
   * Play with a pyro
   * @param tokenId the pyro tokenId
   */
  async play(tokenId: string): Promise<Transaction> {
    const tx = await this.core.send('play(uint256)', [tokenId]);
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   *
   * @param tokenId the pyro tokenId
   */
  async pyroGenesisCooldowns(tokenId: string): Promise<bigint> {
    const cooldown = await this.core.call(`pyroGenesisCooldowns(uint256)`, [
      tokenId
    ]);
    return !isNaN(Number(cooldown ? cooldown.toString() : undefined))
      ? BigInt(cooldown!.toString())
      : BigInt(-1);
  }

  /**
   * Returns the cost for pyrogenesis (stoking)
   * @param tokenId the pyro tokenId
   */
  async pyroGenesisCosts(tokenId: string): Promise<bigint> {
    const cost = await this.core.call(`pyroGenesisCosts(uint256)`, [tokenId]);
    return !isNaN(Number(cost ? cost.toString() : undefined))
      ? BigInt(cost!.toString())
      : BigInt(-1);
  }

  /**
   * Returns the level of a pyro
   * @param tokenId the pyro tokenId
   */
  async pyroLevel(tokenId: string): Promise<bigint> {
    const level = await this.core.call(`pyroLevel(uint256)`, [tokenId]);
    return !isNaN(Number(level ? level.toString() : undefined))
      ? BigInt(level!.toString())
      : BigInt(-1);
  }

  /**
   * Returns a Pyro object
   * @param tokenId the pyro tokenId
   */
  async pyros(tokenId: string): Promise<Pyro> {
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
    const p = await this.core.call('pyros(uint256)', [tokenId]);
    if (p && p.length === 12) {
      pyro.donorA = BigInt(p[0].toString());
      pyro.donorB = BigInt(p[1].toString());
      pyro.generation = BigInt(p[2].toString());
      pyro.name = p[3].toString();
      pyro.ignitionTime = BigInt(p[4].toString());
      pyro.nextPyroGenesis = BigInt(p[5].toString());
      pyro.pyroGenesisCount = BigInt(p[6].toString());
      pyro.stokingWith = BigInt(p[7].toString());
      pyro.hunger = Number(p[8].toString());
      pyro.eyes = Number(p[7].toString());
      pyro.snout = Number(p[10].toString());
      pyro.color = Number(p[11].toString());
    }
    return pyro;
  }

  async safeTransferFrom(
    from: string,
    to: string,
    tokenId: string
  ): Promise<Transaction> {
    const tx = await this.core.send(
      'safeTransferFrom(address,address,uint256)',
      [from, to, tokenId]
    );
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async safeTransferFromData(
    from: string,
    to: string,
    tokenId: string,
    data: string
  ): Promise<Transaction> {
    const tx = await this.core.send(
      'safeTransferFrom(address,address,uint256,bytes)',
      [from, to, tokenId, data]
    );
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Returns the {@link SaleAuction} contract address
   */
  async saleAuction(): Promise<string> {
    const auction = await this.core.call(`saleAuction()`, []);
    return auction ? auction.toString() : ethers.constants.AddressZero;
  }

  async setApprovalForAll(
    operator: string,
    approved: boolean
  ): Promise<Transaction> {
    const tx = await this.core.send('setApprovalForAll(address,bool)', [
      operator,
      `${approved}`
    ]);
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Set the color of a pyro
   * @param tokenId the pyro tokenId
   * @param color an integer 0-7
   */
  async setColor(tokenId: string, color: PyroColor): Promise<Transaction> {
    const tx = await this.core.send('setColor(uint256,uint8)', [
      tokenId,
      `0x${BigInt(color).toString(16)}`
    ]);
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Set the name of a pyro
   * @param tokenId the pyro tokenId
   * @param name the new name of the pyro
   */
  async setName(tokenId: string, name: string): Promise<Transaction> {
    const tx = await this.core.send('setName(uint256,string)', [tokenId, name]);
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Breeds 2 pyros
   * @param donorA pyro tokenId for donorA
   * @param donorB pyro tokenId for donorB
   */
  async stokeWith(donorA: string, donorB: string): Promise<Transaction> {
    const tx = await this.core.send('stokeWith(uint256,uint256)', [
      donorA,
      donorB
    ]);
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Returns the address which is allowed to stoke a pyro
   * @param tokenId the pyro tokenId
   */
  async stokingAllowedToAddress(tokenId: string): Promise<string> {
    const addr = await this.core.call(`stokingAllowedToAddress(uint256)`, [
      tokenId
    ]);
    return addr ? addr.toString() : ethers.constants.AddressZero;
  }

  /**
   * Returns the {@link StokingAuction} contract address
   */
  async stokingAuction(): Promise<string> {
    const auction = await this.core.call(`stokingAuction()`, []);
    return auction ? auction.toString() : ethers.constants.AddressZero;
  }

  /**
   * Returns the base cost (in satoshi) for stoking pyros
   */
  async stokingBaseCost(): Promise<bigint> {
    const cost = await this.core.call(`stokingBaseCost()`, []);
    return !isNaN(Number(cost ? cost.toString() : undefined))
      ? BigInt(cost!.toString())
      : BigInt(0);
  }

  async supportsInterface(interfaceId: string): Promise<boolean> {
    const result = await this.core.call('supportsInterface(bytes4)', [
      interfaceId
    ]);
    return result ? result.toString() === 'true' : false;
  }

  async symbol(): Promise<string> {
    const sym = await this.core.call(`symbol()`, []);
    return sym ? sym.toString() : '';
  }

  async tokenByIndex(index: bigint): Promise<string> {
    const tkn = await this.core.call(`tokenByIndex(uint256)`, [
      `0x${index.toString(16)}`
    ]);
    return tkn ? tkn.toString() : ethers.constants.HashZero;
  }

  async tokenOfOwnerByIndex(owner: string, index: bigint): Promise<string> {
    const tkn = await this.core.call(`tokenOfOwnerByIndex(address,uint256)`, [
      owner,
      `0x${index.toString(16)}`
    ]);
    return tkn ? tkn.toString() : ethers.constants.HashZero;
  }

  async tokenURI(tokenId: string): Promise<string> {
    const uri = await this.core.call(`tokenURI(uint256)`, []);
    return uri ? uri.toString() : '';
  }

  async totalSupply(): Promise<bigint> {
    const total = await this.core.call(`totalSupply()`, []);
    return !isNaN(Number(total ? total.toString() : undefined))
      ? BigInt(total!.toString())
      : BigInt(0);
  }

  async transferFrom(
    from: string,
    to: string,
    tokenId: string
  ): Promise<Transaction> {
    const tx = await this.core.send('transferFrom(address,address,uint256)', [
      from,
      to,
      tokenId
    ]);
    const getReceipts = this.core.provider.getTxReceipts(
      tx,
      this.core.abi,
      this.core.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }
}
