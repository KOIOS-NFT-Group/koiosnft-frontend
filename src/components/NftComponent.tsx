import {
  Badge,
  Box,
  Center,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Metadata } from "./Metadata";
import { NFT } from "./NFT";
import { Alert, AlertIcon, Image } from "@chakra-ui/react";
import PlaceholderIMG from "../assets/placeholder.jpg";

//const boxSize = useBreakpointValue({ base: "", md: boxLg() });

const NftComponent = ({
  token_address,
  token_id,
  owner_of,
  contract_type,
  token_uri,
  metadata,
  amount,
  name,
  symbol,
}: NFT) => {
  const trimNumber = (): string => {
    if (token_id.length > 5) {
      return token_id.slice(0, 5) + "...";
    } else {
      return token_id;
    }
  };

  const trimSymbol = (): string => {
    if (symbol !== null) {
      if (symbol.length > 5) {
        return symbol.slice(0, 7);
      } else {
        return symbol;
      }
    } else {
      return "";
    }
  };

  const ipfs = (): string => {
    let meta: Metadata = JSON.parse(metadata!);
    let ipfsLink: string = "https://ipfs.io/ipfs";
    if (meta.image && meta.image.startsWith("ipfs")) {
      ipfsLink = ipfsLink + meta.image.slice(6);
      console.log("NFT: " + name + " ---- " + ipfsLink);
      return ipfsLink;
    } else {
      return meta.image;
    }
  };

  let symbolTrimmed: string = trimSymbol();
  let tokenId: string = trimNumber();

  if (metadata) {
    let meta: Metadata = JSON.parse(metadata);

    return (
      <Box
        overflow="scroll"
        bg="gray-100"
        p={2}
        minWidth="200px"
        border="2px"
        borderRadius="12px"
        m={2}
        borderColor="rgba(179,184,212,1)"
      >
        <VStack>
          <Image
            ml={3}
            boxSize="220px"
            borderRadius="12px"
            objectFit="contain"
            alt={meta.name}
            src={ipfs()}
          />
          <Heading fontSize="md" align="center">
            {name}
          </Heading>
          <VStack>
            <Center>
              <Badge borderRadius="5px" px="5" m={2} colorScheme="teal">
                {symbolTrimmed}
              </Badge>
              <Badge borderRadius="5px" px="5" m={2} colorScheme="teal">
                # {tokenId}
              </Badge>
            </Center>
            <Text
              borderRadius="5px"
              px="5"
              m={2}
              fontWeight="bold"
              align="center"
            >
              {meta.name}
            </Text>
          </VStack>
        </VStack>
      </Box>
    );
  } else {
    return (
      <Box
        overflow="hidden"
        p={2}
        border="2px"
        borderRadius="12px"
        m={2}
        borderColor="rgba(179,184,212,1)"
      >
        <VStack>
          <Image
            borderRadius="12px"
            boxSize="225px"
            objectFit="cover"
            src={PlaceholderIMG}
          />
          <VStack>
            <Heading fontSize="md" align="center">
              {name}
            </Heading>
            <Center>
              <Badge borderRadius="5px" px="5" m={2} colorScheme="teal">
                {symbolTrimmed}
              </Badge>
              <Badge borderRadius="5px" px="5" m={2} colorScheme="teal">
                # {tokenId}
              </Badge>
            </Center>
            <Alert size="2xs" status="error" borderRadius="5px">
              <AlertIcon />
              No Metadata was found!
            </Alert>
          </VStack>
        </VStack>
      </Box>
    );
  }
};

export default NftComponent;
