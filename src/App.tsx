import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { Container } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { Chains, Subgraph, Subgraphs, TheGraphProvider, useCreateSubgraph, useSubgraph } from "thegraph-react";

const version = "0.0.5";
const subgraph = "akl4m8c9";
const api_url = 'https://api.studio.thegraph.com/query/5422/' + subgraph + '/' + version; // <-- ENTER YOUR SUBGRAPH NODE URL HERE
const input = Object();

function Parse(input:unknown) {

  let _input = Object(input);
  //Debug in-browser
  //console.log(_input);

  let render = JSON.parse(_input.token.tokenURI);

  return (
    <img src={render} alt=""/>
    );

}

function Huddl({ tokenData }: {
  readonly tokenData: Subgraph,
}): JSX.Element {
  const { useQuery } = useSubgraph(tokenData);
  
  // ENTER YOUR QUERY HERE
  // ID currently hardcoded for testing
  const { error, loading, data} = useQuery(gql`
  {
    token(id:"0xe9b6db0bb21e6df1fe6f8c5e076740eebf4d81eb_2836"){
      id
      contract
      tokenID
      owner
      mintTime
      tokenURI
    }
  }

  `);

  return (
    <Container>
      <Box>
        {(error || loading) ? "Loading…" :
        Parse(data)
        }
      </Box>
    </Container>
  );
}

export default function App(): JSX.Element {

  const tokenData = useCreateSubgraph({
    [Chains.MAINNET]: api_url, // <-- ENTER YOUR QUERY URL HERE
  });

  const subgraphs = React.useMemo((): Subgraphs => {
    return [tokenData];
  }, [tokenData]);

  return (
    <TheGraphProvider chain={Chains.MAINNET} subgraphs={subgraphs}>
      <Huddl tokenData={tokenData} />
    </TheGraphProvider>
  );
}