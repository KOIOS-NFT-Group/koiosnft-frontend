import {
  Heading,
  Text,
  Flex,
  Box,
  Spacer,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useEffect, useState } from "react";

function ContentHeader() {
  const { isAuthenticated, user } = useMoralis();
  const { account } = useMoralisWeb3Api();
  const [nfts, setNfts] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      const userAddr = user?.get("ethAddress");
      const fetchNFTs = async () => {
        const response = await account.getNFTs({
          chain: "rinkeby",
          address: userAddr,
        });
        const numberOf = response.result!.length;
        setNfts(numberOf);
      };
      fetchNFTs();
    }
  });

  const collectedAmount = () => {
    if (isAuthenticated) {
      return (
        <VStack>
          <Heading p={4} pl={2} fontSize={{ base: "md", lg: "2xl" }}>
            Collected NFTs
          </Heading>
          <Text pl={2}>{nfts}</Text>
        </VStack>
      );
    }
  };

  const collectedNFTs = useBreakpointValue({ base: "", md: collectedAmount() });

  const messageConnection = () => {
    if (isAuthenticated) {
      return (
        <Text fontWeight="bold" pl={2}>
          Address: {user?.get("ethAddress")}
        </Text>
      );
    } else {
      return (
        <Text fontWeight="bold" pl={2}>
          Please, connect your wallet.
        </Text>
      );
    }
  };

  const HeaderOptions = () => {
    return (
      <div>
        <Flex>
          <Box>
            <Heading p={4} pl={2} fontSize={{ base: "md", lg: "2xl" }}>
              NFT Collection
            </Heading>
            {messageConnection()}
          </Box>
          <Spacer />
          {collectedNFTs}
        </Flex>
      </div>
    );
  };

  return HeaderOptions();
}
export default ContentHeader;
