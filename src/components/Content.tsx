import { useColorModeValue } from "@chakra-ui/color-mode";
import { Divider, Grid, GridItem } from "@chakra-ui/layout";
import { Network } from "../services/Network";
import ContentBody from "./ContentBody";
import ContentHeader from "./ContentHeader";

const Content = ({ chainId, name }: Network) => {
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
      <GridItem rowSpan={1}>
        <ContentHeader chainId={chainId} name={name} />
      </GridItem>
      <GridItem rowSpan={1}>
        <Divider border="2px" />
      </GridItem>
      <GridItem mt={-10} rowSpan={5} overflowX="hidden" overflowY="scroll">
        <ContentBody chainId={chainId} name={name} />
      </GridItem>
    </Grid>
  );
};

export default Content;
