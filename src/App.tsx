import { gql } from "@apollo/client";
import React from "react";
import { Container } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { Chains, Subgraph, Subgraphs, TheGraphProvider, useCreateSubgraph, useSubgraph } from "thegraph-react";

function Huddl({ huddl }: {
  readonly huddl: Subgraph,
}): JSX.Element {
  const { useQuery } = useSubgraph(huddl);

  // ENTER YOUR QUERY HERE
  const { error, loading, data } = useQuery(gql`
  {
    exampleEntities(first: 10) {
      id
      count
      owner
      approved
    }
  }
  `);

  //Debug in-browser
  console.log(data);

  return (
    <Container>
      <Text>{(error || loading) ? 'Loading...' : JSON.stringify(data)}</Text>
    </Container>
  );
}


export default function App(): JSX.Element {
  const huddl = useCreateSubgraph({
    [Chains.MAINNET]: 'https://api.studio.thegraph.com/query/5422/akl4m8c9/0.0.1', // <-- ENTER YOUR QUERY URL HERE
  });

  const subgraphs = React.useMemo((): Subgraphs => {
    return [huddl];
  }, [huddl]);

  return (
    <TheGraphProvider chain={Chains.MAINNET} subgraphs={subgraphs}>
      <Huddl huddl={huddl} />
    </TheGraphProvider>
  );
}