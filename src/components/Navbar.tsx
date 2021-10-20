import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  useBreakpointValue,
  SimpleGrid,
} from "@chakra-ui/react";
import AuthButtons from "./AuthenticationButton";
import ThemeButton from "./ThemeButton";
import { Network } from "../services/Network";
import NetworkButton from "./NetworkButton";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const showTitle = ({ chainId, networkName }: Network) => {
  return (
    <Grid
      p={2}
      border="2px"
      borderRadius="12px"
      m={2}
      borderColor="rgba(179,184,212,.2)"
      templateColumns="repeat(3, 1fr)"
    >
      <GridItem colSpan={1}>
        <Flex>
          <Box p="2">
            <NavLink to="/">
              <Button fontSize={{ base: "md", lg: "2xl" }}>Dashboard</Button>
            </NavLink>
          </Box>
          <Box p="2">
            <NavLink to="/mint">
              <Button fontSize={{ base: "md", lg: "2xl" }}>Mint</Button>
            </NavLink>
          </Box>
        </Flex>
      </GridItem>
      <GridItem colSpan={1}>
        <Center>
          <Box p="2">
            <Heading fontSize={{ base: "md", lg: "2xl" }}>
              NFT Dashboard
            </Heading>
          </Box>
        </Center>
      </GridItem>
      <GridItem colSpan={1}>
        <Box float="right">
          <NetworkButton chainId={chainId} networkName={networkName} />
          <AuthButtons />
          <ThemeButton />
        </Box>
      </GridItem>
    </Grid>
  );
};

const showMobile = ({ chainId, networkName }: Network) => {
  return (
    <>
      <SimpleGrid minChildWidth="150px">
        <NavLink to="/dashboard">
          <Button m={2} width="90%">
            Dashboard
          </Button>
        </NavLink>
        <NavLink to="/mint">
          <Button m={2} width="90%">
            Mint
          </Button>
        </NavLink>
        <NetworkButton chainId={chainId} networkName={networkName} />
        <AuthButtons />
        <ThemeButton />
      </SimpleGrid>
    </>
  );
};

const Navbar = ({ chainId, networkName }: Network) => {
  const title = useBreakpointValue({
    base: showMobile({ chainId, networkName }),
    md: showTitle({ chainId, networkName }),
  });

  return <>{title}</>;
};
export default Navbar;
