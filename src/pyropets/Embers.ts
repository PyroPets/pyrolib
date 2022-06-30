import { ethers } from 'ethers';
import ABI from '../abi';
import { CONTRACTS } from '../constants';
import { MetrixContract, Transaction } from '../mrx';
import { ERC20 } from '../mrx/interface/ERC20';
import { IERC20 } from '../mrx/interface/IERC20';
import { IERC20Metadata } from '../mrx/interface/IERC20Metadata';
import { Provider } from '../provider';

/** Class which can be used to interact with the Embers (MBRS) token contract */
export default class Embers implements ERC20, IERC20, IERC20Metadata {
  private token: MetrixContract;
  constructor(provider: Provider) {
    this.token = new MetrixContract(
      CONTRACTS[provider.network].Embers,
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
    return !isNaN(Number(allowance ? allowance.toString() : undefined))
      ? BigInt(allowance!.toString())
      : BigInt(0);
  }

  async approve(spender: string, amount: bigint): Promise<Transaction> {
    const tx = await this.token.send('approve(address,uint256)', [
      spender,
      `0x${amount.toString(16)}`
    ]);
    const getReceipts = this.token.provider.getTxReceipts(
      tx,
      this.token.abi,
      this.token.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async balanceOf(owner: string): Promise<bigint> {
    const balance = await this.token.call(`balanceOf(address)`, [owner]);
    return !isNaN(Number(balance ? balance.toString() : undefined))
      ? BigInt(balance!.toString())
      : BigInt(0);
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
    const tx = await this.token.send('burn(uint256)', [
      `0x${amount.toString(16)}`
    ]);
    const getReceipts = this.token.provider.getTxReceipts(
      tx,
      this.token.abi,
      this.token.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Permanently destroy MBRS tokens from the specified account
   * @param account the account to burn the MBRS tokens
   * @param amount the amount of MBRS tokens to burn
   */
  async burnFrom(account: string, amount: bigint): Promise<Transaction> {
    const tx = await this.token.send('burnFrom(address,uint256)', [
      account,
      `0x${amount.toString(16)}`
    ]);
    const getReceipts = this.token.provider.getTxReceipts(
      tx,
      this.token.abi,
      this.token.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Create MBRS tokens by burning MRX
   */
  async createEmbers(): Promise<Transaction> {
    const tx = await this.token.send('createEmbers()', []);
    const getReceipts = this.token.provider.getTxReceipts(
      tx,
      this.token.abi,
      this.token.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async decimals(): Promise<number> {
    const dec = await this.token.call(`decimals()`, []);
    return !isNaN(Number(dec ? dec.toString() : undefined))
      ? Number(dec!)
      : Number(0);
  }

  async decreaseAllowance(
    spender: string,
    amount: bigint
  ): Promise<Transaction> {
    const tx = await this.token.send('decreaseAllowance(address,uint256)', [
      spender,
      `0x${amount.toString(16)}`
    ]);
    const getReceipts = this.token.provider.getTxReceipts(
      tx,
      this.token.abi,
      this.token.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async increaseAllowance(
    spender: string,
    amount: bigint
  ): Promise<Transaction> {
    const tx = await this.token.send('increaseAllowance(address,uint256)', [
      spender,
      `0x${amount.toString(16)}`
    ]);
    const getReceipts = this.token.provider.getTxReceipts(
      tx,
      this.token.abi,
      this.token.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Returns the minimum amount of MBRS which can be burned
   */
  async minBurn(): Promise<bigint> {
    const min = await this.token.call(`minBurn()`, []);
    return !isNaN(Number(min ? min.toString() : undefined))
      ? BigInt(min!.toString())
      : BigInt(0);
  }

  /**
   * Create MBRS tokens by burning MRX
   */
  async mint(): Promise<Transaction> {
    const tx = await this.token.send('mint()', []);
    const getReceipts = this.token.provider.getTxReceipts(
      tx,
      this.token.abi,
      this.token.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async name(): Promise<string> {
    const n = await this.token.call(`name()`, []);
    return n ? n.toString() : '';
  }

  async symbol(): Promise<string> {
    const sym = await this.token.call(`symbol()`, []);
    return sym ? sym.toString() : '';
  }

  async totalSupply(): Promise<bigint> {
    const total = await this.token.call(`totalSupply()`, []);
    return !isNaN(Number(total ? total.toString() : undefined))
      ? BigInt(total!.toString())
      : BigInt(0);
  }

  async transfer(recipient: string, amount: bigint): Promise<Transaction> {
    const tx = await this.token.send('transfer(address,uint256)', [
      recipient,
      `0x${amount.toString(16)}`
    ]);
    const getReceipts = this.token.provider.getTxReceipts(
      tx,
      this.token.abi,
      this.token.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async transferFrom(
    sender: string,
    recipient: string,
    amount: bigint
  ): Promise<Transaction> {
    const tx = await this.token.send('transferFrom(address,uint256)', [
      sender,
      recipient,
      `0x${amount.toString(16)}`
    ]);
    const getReceipts = this.token.provider.getTxReceipts(
      tx,
      this.token.abi,
      this.token.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }
}
