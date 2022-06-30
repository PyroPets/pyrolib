export interface Auction {
  tokenId: string;
  winningBid: bigint;
  minimumBid: bigint;
  biddingTime: bigint;
  startTime: bigint;
  winningBidder: string;
  beneficiaryAddress: string;
  ended: boolean;
}
