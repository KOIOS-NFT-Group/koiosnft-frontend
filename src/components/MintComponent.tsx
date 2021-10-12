import { useColorModeValue } from "@chakra-ui/color-mode";
import { Center, Grid, GridItem, Heading, VStack } from "@chakra-ui/layout";
import { Network } from "../services/Network";
import MintBody from "./MintBody";

const MintComponent = ({ chainId, networkName }: Network) => {
  return (
    <Grid
      p={2}
      border="2px"
      borderRadius="12px"
      m={2}
      borderColor={useColorModeValue(
        "rgba(179,184,212,1)",
        "rgba(179,184,212,.2)"
      )}
      h="95%"
      templateRows="repeat(7, 2fr)"
    >
      <Center>
        <VStack>
          <GridItem p={5} rowSpan={2} overflowX="hidden" overflowY="scroll">
            <Heading>Mint your NFT</Heading>
          </GridItem>
          <GridItem mt={-10} rowSpan={5} overflowX="hidden" overflowY="scroll">
            <MintBody chainId={chainId} networkName={networkName} />
          </GridItem>
        </VStack>
      </Center>
    </Grid>
  );
};

export default MintComponent;
