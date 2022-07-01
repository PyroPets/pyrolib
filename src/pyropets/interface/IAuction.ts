import { Transaction } from '../../mrx';
import { Auction } from './Aution';

/**
 * Interface that represents an auction smart contract which implements IAuction
 *
 * @interface
 */
export interface IAuction {
  /**
   * End an auction if the bidding time has elapsed
   * @param tokenId the pyro tokenId
   */
  auctionEnd(tokenId: string): Promise<Transaction>;

  /**
   * Cancel an auction that has not been bid on yet
   * @param tokenId the pyro tokenId
   */
  cancelAuction(tokenId: string): Promise<Transaction>;

  /**
   * Claim the pyro from an auction as the winning bidder or the beneficiaryAddress if nno winning bidder
   * @param tokenId the pyro tokenId
   */
  claim(tokenId: string): Promise<Transaction>;

  /**
   * Create a new auction
   * @param tokenId the pyro tokenId
   * @param minimumBid the minimum bid amount in satoshi
   * @param biddingTime the amount of time for bidding in seconds
   * @param beneficiaryAddress the address which will be awarded the winning bid, or the pyro if no winner
   */
  createAuction(
    tokenId: string,
    minimumBid: bigint,
    biddingTime: bigint,
    beneficiaryAddress: string
  ): Promise<Transaction>;

  /**
   * Returns an {@link Auction} object
   * @param tokenId the pyro tokenId
   */
  getAuction(tokenId: string): Promise<Auction>;

  /**
   * Withdraw any funds available from bids which have been outbid
   */
  withdraw(): Promise<Transaction>;
}
