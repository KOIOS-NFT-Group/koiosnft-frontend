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
import { Network } from "../services/Network";

const ContentHeader = ({ chainId, name }: Network) => {
  const { isAuthenticated, user } = useMoralis();
  const { account } = useMoralisWeb3Api();
  const [nfts, setNfts] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      switch (name) {
        case "eth": {
          const userAddr = user?.get("ethAddress");
          const fetchNFTs = async () => {
            const response = await account.getNFTs({
              chain: "eth",
              address: userAddr,
            });
            const numberOf = response.result!.length;
            setNfts(numberOf);
          };
          fetchNFTs();
          break;
        }
        case "rinkeby": {
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
          break;
        }
        case "polygon": {
          const userAddr = user?.get("ethAddress");
          const fetchNFTs = async () => {
            const response = await account.getNFTs({
              chain: "polygon",
              address: userAddr,
            });
            const numberOf = response.result!.length;
            setNfts(numberOf);
          };
          fetchNFTs();
          break;
        }
      }
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

  const addrSize = useBreakpointValue({ base: "xs", md: "md" });

  const messageConnection = () => {
    if (isAuthenticated) {
      return (
        <Text fontWeight="bold" pl={2} fontSize={addrSize}>
          {user?.get("ethAddress")}
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
              {name}: NFT Collection
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
};
export default ContentHeader;
