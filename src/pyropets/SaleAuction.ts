import ABI from '../abi';
import { CONTRACTS } from '../constants';
import { MetrixContract } from '../mrx';
import { Provider } from '../provider';
import { NetworkType } from '../types';

/** Class which can be used to interact with the PyroPets SaleAuction contract */
export default class SaleAuction {
  private network: NetworkType;
  private auction: MetrixContract;
  constructor(network: NetworkType, provider: Provider) {
    this.network = network;
    this.auction = new MetrixContract(
      CONTRACTS[network].SaleAuction,
      provider,
      ABI.SaleAuction,
      undefined
    );
  }
  auctionEnd(tokenId: bigint) {}
  auctions(tokenId: bigint) {}
  bid(tokenId: bigint) {}
  cancelAuctionn(tokenId: bigint) {}
  claim(tokenId: bigint) {}
  core() {}
  createAuction(
    tokenId: bigint,
    minimumBid: bigint,
    biddingTime: bigint,
    beneficiaryAddress: string
  ) {}
  getAuction(tokenId: bigint) {}
  pendingReturns(addr: bigint) {}
  withdraw() {}
}
