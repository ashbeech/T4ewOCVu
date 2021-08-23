# About

This project is a framework to develop web/mobile frontend for subgraph backend. Currently under construction; acting as a sandbox for query testing.

# Getting Started

This is currently designed as a sandbox for building-out a full ReactJS frontend, but you are able to build your own queries for testing in-app (start at [App.jsx](src/App.jsx)) or run queries via the query explorer in a hosted instance of the subgraph:

### Subgraph Instance v0.1.1 (full contract index)

[Link to Temporary SubGraph](https://thegraph.com/studio/subgraph/akl4m8c9/)

[Link to Temporary End Point (v0.1.1)](https://api.studio.thegraph.com/query/5422/akl4m8c9/0.1.0)

```javascript
const version = "0.1.1";
const subgraph = "akl4m8c9";
const api_url =
  "https://api.studio.thegraph.com/query/5422/" + subgraph + "/" + version; // <-- ENTER YOUR SUBGRAPH NODE URL HERE
```

## Example Queries

```graphql
# Get all token data.
query tokenFireHose {
  tokens {
    id
    contract {
      id
    }
    tokenID
    tokenURI
    owner {
      id
    }
    mintTime
    minter {
      id
    }
  }
}
# Get top 5 minters
query topMinters {
  owners(first: 5, orderBy: numMints, orderDirection: desc) {
    id
    numMints
  }
}

# Every token minted past 24 hours.
# $timeWindow variable required and must be passed as seconds.
# For 24 hours worth of posts minted: $timeWindow = {number:$nowInSecs-$24hrInSecs} i.e. 1629717277-86400 = 1629630877
# More on variables: https://thegraph.com/docs/developer/graphql-api#example-3 and https://graphql.org/learn/queries/
query latestMints($timeWindow: BigInt!) {
  tokens(
    first: 5
    where: { mintTime_lt: $timeWindow }
    orderBy: mintTime
    orderDirection: desc
  ) {
    id
    mintTime
  }
}

# Get specific token data by ID (minting contract address + token ID)
query tokenSelector {
  token(id: "0xe9b6db0bb21e6df1fe6f8c5e076740eebf4d81eb_2763") {
    id
    contract {
      id
    }
    tokenID
    tokenURI
    owner {
      id
    }
    mintTime
    minter {
      id
    }
  }
}

# Get owner's tokens (first 10)
query tokenByOwner {
  owner(id: "0xb71147d12e2ec640decc103bd126911d23ae2fba") {
    id
    tokens(first: 10, orderBy: mintTime, orderDirection: asc) {
      id
      tokenID
    }
    numTokens
    numMints
  }
}

# Get owner's tokens (paginated e.g. page 2, next 10)
query tokenByOwner {
  owner(id: "0xb71147d12e2ec640decc103bd126911d23ae2fba") {
    id
    tokens(first: 10, skip: 10, orderBy: mintTime, orderDirection: asc) {
      id
      tokenID
    }
    numTokens
    numMints
  }
}

query filterOwnersTokens {
  owner(id: "0xb71147d12e2ec640decc103bd126911d23ae2fba") {
    id
    tokens(where: { tokenID: 2763 }) {
      id
      tokenID
    }
    numTokens
    numMints
  }
}

query tokensByMinter {
  tokens(
    first: 1
    where: { minter: "0xb71147d12e2ec640decc103bd126911d23ae2fba" }
  ) {
    id
    contract {
      id
    }
    tokenID
    tokenURI
    owner {
      id
    }
    mintTime
    minter {
      id
    }
  }
}

# Get all tokens under contract. Returns unique token IDs
query tokensByContract {
  tokenContracts {
    id
    name
    symbol
    doAllAddressesOwnTheirIdByDefault
    supportsEIP721Metadata
    tokens {
      id
      tokenID
    }
    numTokens
    numOwners
  }
}

# Hosted Studio Note: Avoid multiple queries (https://github.com/graphprotocol/graph-node/issues/934)
```

---

## Available Scripts

Once installed, to run the app and see the query you've built, displayed. In the project directory run:

### `yarn start`
