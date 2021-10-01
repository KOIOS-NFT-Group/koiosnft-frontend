import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import AuthButtons from "./AuthenticationButton";
import ThemeButton from "./ThemeButton";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Network } from "../services/Network";
import NetworkButton from "./NetworkButton";

const Navbar = ({ chainId, name }: Network) => {
  return (
    <Flex
      p={2}
      border="2px"
      borderRadius="12px"
      m={2}
      borderColor={useColorModeValue(
        "rgba(179,184,212,1)",
        "rgba(179,184,212,.2)"
      )}
    >
      <Box p="2">
        <Heading fontSize={{ base: "md", lg: "2xl" }}>NFT Dashboard</Heading>
      </Box>
      <Spacer />
      <Box>
        <NetworkButton chainId={chainId} name={name} />
        <AuthButtons hasWeb3={true} />
        <ThemeButton />
      </Box>
    </Flex>
  );
};
export default Navbar;
