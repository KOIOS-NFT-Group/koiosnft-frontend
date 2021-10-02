import { useColorModeValue } from "@chakra-ui/color-mode";
import { Divider, Grid, GridItem } from "@chakra-ui/layout";
import ContentBody from "./ContentBody";
import ContentHeader from "./ContentHeader";

function Content() {
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
        <ContentHeader />
      </GridItem>
      <GridItem rowSpan={1}>
        <Divider border="2px" />
      </GridItem>
      <GridItem mt={-10} rowSpan={5} overflowX="hidden" overflowY="scroll">
        <ContentBody />
      </GridItem>
    </Grid>
  );
}

export default Content;
