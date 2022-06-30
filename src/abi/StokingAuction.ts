export const StokingAuction = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_core',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'AuctionAlreadyEnded',
    type: 'error'
  },
  {
    inputs: [],
    name: 'AuctionEndAlreadyCalled',
    type: 'error'
  },
  {
    inputs: [],
    name: 'AuctionNotCancelable',
    type: 'error'
  },
  {
    inputs: [],
    name: 'AuctionNotYetEnded',
    type: 'error'
  },
  {
    inputs: [],
    name: 'BidBelowMinimum',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'highestBid',
        type: 'uint256'
      }
    ],
    name: 'BidNotHighEnough',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidStokingPair',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minimumBid',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'biddingTime',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address payable',
        name: 'beneficiaryAddress',
        type: 'address'
      }
    ],
    name: 'AuctionCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'winner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'AuctionEnded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [],
    name: 'Canceled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'bidder',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'HighestBidIncreased',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'auctionEnd',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'auctions',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'winningBid',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'minimumBid',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'biddingTime',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'winningBidder',
        type: 'address'
      },
      {
        internalType: 'address payable',
        name: 'beneficiaryAddress',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'ended',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'donor',
        type: 'uint256'
      }
    ],
    name: 'bid',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'cancelAuction',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'claim',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'core',
    outputs: [
      {
        internalType: 'contract PyroAuction',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'minimumBid',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'biddingTime',
        type: 'uint256'
      },
      {
        internalType: 'address payable',
        name: 'beneficiaryAddress',
        type: 'address'
      }
    ],
    name: 'createAuction',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'donors',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'getAuction',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'winningBid',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'minimumBid',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'biddingTime',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'winningBidder',
        type: 'address'
      },
      {
        internalType: 'address payable',
        name: 'beneficiaryAddress',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'ended',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'pendingReturns',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'donor',
        type: 'uint256'
      }
    ],
    name: 'stokingCost',
    outputs: [
      {
        internalType: 'uint256',
        name: 'cost',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
