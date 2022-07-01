import { ethers } from 'ethers';
import ABI from '../abi';
import { CONTRACTS } from '../constants';
import { MetrixContract, Transaction } from '../mrx';
import { Provider } from '../provider';
import { Auction } from './interface/Aution';
import { IAuction } from './interface/IAuction';

/** Class which can be used to interact with the PyroPets StokingAuction contract */
export default class StokingAuction implements IAuction {
  private auction: MetrixContract;
  constructor(provider: Provider) {
    this.auction = new MetrixContract(
      CONTRACTS[provider.network].StokingAuction,
      provider,
      ABI.StokingAuction,
      undefined
    );
  }

  async auctionEnd(tokenId: string): Promise<Transaction> {
    const tx = await this.auction.send('auctionEnd(uint256)', [tokenId]);
    const getReceipts = this.auction.provider.getTxReceipts(
      tx,
      this.auction.abi,
      this.auction.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Returns an {@link Auction} object
   * @param tokenId the pyro tokenId
   */
  async auctions(tokenId: string): Promise<Auction> {
    const ac: Auction = {
      tokenId: ethers.constants.HashZero,
      winningBid: BigInt(0),
      minimumBid: BigInt(0),
      biddingTime: BigInt(0),
      startTime: BigInt(0),
      winningBidder: ethers.constants.AddressZero,
      beneficiaryAddress: ethers.constants.AddressZero,
      ended: true
    };
    const a = await this.auction.call('auctions(uint256)', [tokenId]);
    if (a && a.length === 8) {
      ac.tokenId = `0x${BigInt(a[0].toString()).toString(16)}`;
      ac.winningBid = BigInt(a[1].toString());
      ac.minimumBid = BigInt(a[2].toString());
      ac.biddingTime = BigInt(a[3].toString());
      ac.startTime = BigInt(a[4].toString());
      ac.winningBidder = a[5].toString();
      ac.beneficiaryAddress = a[6].toString();
      ac.ended = a[7].toString() === 'true';
    }
    return ac;
  }

  /**
   * Bid on a stoking auction
   * @param tokenId the auctioned pyro tokenId
   * @param donor the pyro tokenId of the donorA
   */
  async bid(tokenId: string, donor: string): Promise<Transaction> {
    const tx = await this.auction.send('bid(uint256,uint256)', [
      tokenId,
      donor
    ]);
    const getReceipts = this.auction.provider.getTxReceipts(
      tx,
      this.auction.abi,
      this.auction.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async cancelAuction(tokenId: string): Promise<Transaction> {
    const tx = await this.auction.send('cancelAuction(uint256)', [tokenId]);
    const getReceipts = this.auction.provider.getTxReceipts(
      tx,
      this.auction.abi,
      this.auction.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async claim(tokenId: string): Promise<Transaction> {
    const tx = await this.auction.send('claim(uint256)', [tokenId]);
    const getReceipts = this.auction.provider.getTxReceipts(
      tx,
      this.auction.abi,
      this.auction.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Returns the address of the PyroCore contract
   */
  async core(): Promise<string> {
    const c = await this.auction.call(`core()`, []);
    return c ? c.toString() : ethers.constants.AddressZero;
  }

  async createAuction(
    tokenId: string,
    minimumBid: bigint,
    biddingTime: bigint,
    beneficiaryAddress: string
  ): Promise<Transaction> {
    const tx = await this.auction.send(
      'createAuction(uint256,uint256,uint256,address)',
      [
        tokenId,
        `0x${minimumBid.toString(16)}`,
        `0x${biddingTime.toString(16)}`,
        beneficiaryAddress
      ]
    );
    const getReceipts = this.auction.provider.getTxReceipts(
      tx,
      this.auction.abi,
      this.auction.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Returns the donor tokenId from an auction
   * @param tokenId
   */
  async donors(tokenId: string): Promise<string> {
    const donor = await this.auction.call(`donors(uint256)`, [tokenId]);
    return donor ? donor.toString() : ethers.constants.HashZero;
  }

  async getAuction(tokenId: string): Promise<Auction> {
    const ac: Auction = {
      tokenId: ethers.constants.HashZero,
      winningBid: BigInt(0),
      minimumBid: BigInt(0),
      biddingTime: BigInt(0),
      startTime: BigInt(0),
      winningBidder: ethers.constants.AddressZero,
      beneficiaryAddress: ethers.constants.AddressZero,
      ended: true
    };
    const a = await this.auction.call('getAuction(uint256)', [tokenId]);
    if (a && a.length === 8) {
      ac.tokenId = `0x${BigInt(a[0].toString()).toString(16)}`;
      ac.winningBid = BigInt(a[1].toString());
      ac.minimumBid = BigInt(a[2].toString());
      ac.biddingTime = BigInt(a[3].toString());
      ac.startTime = BigInt(a[4].toString());
      ac.winningBidder = a[5].toString();
      ac.beneficiaryAddress = a[6].toString();
      ac.ended = a[7].toString() === 'true';
    }
    return ac;
  }

  /**
   *
   * @param addr
   */
  async pendingReturns(addr: string): Promise<bigint> {
    const pending = await this.auction.call(`pendingReturns(address)`, [addr]);
    return !isNaN(Number(pending ? pending.toString() : undefined))
      ? BigInt(
          pending!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(0);
  }

  /**
   *
   * @param donorA
   * @param donorB
   */
  async stokingCost(donorA: string, donorB: string): Promise<bigint> {
    const cost = await this.auction.call(`stokingCost(uint256,uint256)`, [
      donorA,
      donorB
    ]);
    return !isNaN(Number(cost ? cost.toString() : undefined))
      ? BigInt(
          cost!.toString() /* eslint-disable-line @typescript-eslint/no-non-null-assertion */
        )
      : BigInt(-1);
  }

  async withdraw(): Promise<Transaction> {
    const tx = await this.auction.send('withdraw()', []);
    const getReceipts = this.auction.provider.getTxReceipts(
      tx,
      this.auction.abi,
      this.auction.address
    );
    return {
      txid: tx.txid,
      getReceipts
    };
  }
}
