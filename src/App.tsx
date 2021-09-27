import { Flex, Grid, GridItem } from "@chakra-ui/layout";
import "./app.scss";
import Content from "./components/Content";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Grid templateRows="repeat(10,1fr)" h="100vh">
      <GridItem rowSpan={1}>
        <Navbar></Navbar>
      </GridItem>
      <GridItem rowSpan={9}>
        <Content />
      </GridItem>
    </Grid>
  );
}

export default App;
