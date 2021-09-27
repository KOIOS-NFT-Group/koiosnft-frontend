import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import AuthButtons from "./AuthenticationButton";
import ThemeButton from "./ThemeButton";
import { useColorModeValue } from "@chakra-ui/color-mode";

function Navbar() {
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
        <AuthButtons />
        <ThemeButton />
      </Box>
    </Flex>
  );
}
export default Navbar;
