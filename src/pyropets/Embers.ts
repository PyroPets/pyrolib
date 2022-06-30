import { ethers } from 'ethers';
import ABI from '../abi';
import { CONTRACTS } from '../constants';
import { MetrixContract, Transaction } from '../mrx';
import { ERC20 } from '../mrx/interface/ERC20';
import { IERC20 } from '../mrx/interface/IERC20';
import { IERC20Metadata } from '../mrx/interface/IERC20Metadata';
import { Provider } from '../provider';
import { NetworkType } from '../types';

/** Class which can be used to interact with the Embers (MBRS) token contract */
export default class Embers implements ERC20, IERC20, IERC20Metadata {
  private network: NetworkType;
  private token: MetrixContract;
  constructor(network: NetworkType, provider: Provider) {
    this.network = network;
    this.token = new MetrixContract(
      CONTRACTS[network].Embers,
      provider,
      ABI.Embers,
      undefined
    );
  }

  async allowance(owner: string, spender: string): Promise<bigint> {
    const allowance = await this.token.call(`allowance(address,address)`, [
      owner,
      spender
    ]);
    throw new Error('Method not implemented');
  }

  async approve(spender: string, amount: bigint): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  async balanceOf(owner: string): Promise<bigint> {
    const balance = await this.token.call(`balanceOf(address)`, [owner]);
    throw new Error('Method not implemented');
  }

  /**
   * Returns the address of the PyroCore contract
   */
  async base(): Promise<string> {
    const base = await this.token.call(`base()`, []);
    return base ? base.toString() : ethers.constants.AddressZero;
  }

  /**
   * Permanently destroy MBRS tokens from the transaction sender's account
   * @param amount the amount of MBRS tokens to burn
   */
  async burn(amount: bigint): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  /**
   * Permanently destroy MBRS tokens from the specified account
   * @param account the account to burn the MBRS tokens
   * @param amount the amount of MBRS tokens to burn
   */
  async burnFrom(account: string, amount: bigint) {
    throw new Error('Method not implemented');
  }

  /**
   * Create MBRS tokens by burning MRX
   */
  async createEmbers(): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  async decimals(): Promise<number> {
    const dec = await this.token.call(`decimals()`, []);
    throw new Error('Method not implemented');
  }

  async decreaseAllowance(
    spender: string,
    amount: bigint
  ): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  async increaseAllowance(
    spender: string,
    amount: bigint
  ): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  /**
   * Returns the minimum amount of MBRS which can be burned
   */
  async minBurn(): Promise<bigint> {
    const min = await this.token.call(`minBurn()`, []);
    throw new Error('Method not implemented');
  }

  /**
   * Create MBRS tokens by burning MRX
   */
  async mint(): Promise<Transaction> {
    throw new Error('Method not implemented');
  }

  async name(): Promise<string> {
    throw new Error('Method not implemented');
  }

  async symbol(): Promise<string> {
    const sym = await this.token.call(`symbol()`, []);
    throw new Error('Method not implemented');
  }
  async totalSupply(): Promise<bigint> {
    const total = await this.token.call(`totalSupply()`, []);
    throw new Error('Method not implemented');
  }
  async transfer(recipient: string, amount: bigint): Promise<Transaction> {
    throw new Error('Method not implemented');
  }
  async transferFrom(
    sender: string,
    recipient: string,
    amount: bigint
  ): Promise<Transaction> {
    throw new Error('Method not implemented');
  }
}
