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
import {
  Alert,
  AlertIcon,
  Button,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
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
  if (metadata) {
    let meta: Metadata = JSON.parse(metadata);

    return (
      <Box
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
            boxSize="225px"
            borderRadius="12px"
            objectFit="cover"
            src={meta.image}
          />
          <Heading fontSize="md">{name}</Heading>
          <VStack>
            <Center>
              <Badge borderRadius="5px" px="5" m={2} colorScheme="teal">
                {symbol}
              </Badge>
              <Badge borderRadius="5px" px="5" m={2} colorScheme="teal">
                # {token_id}
              </Badge>
            </Center>
            <Text borderRadius="5px" px="5" m={2} fontWeight="bold">
              {meta.name}
            </Text>
          </VStack>
        </VStack>
      </Box>
    );
  } else {
    return (
      <Box
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
            <Heading fontSize="md">{name}</Heading>
            <Center>
              <Badge borderRadius="5px" px="5" m={2} colorScheme="teal">
                {symbol}
              </Badge>
              <Badge borderRadius="5px" px="5" m={2} colorScheme="teal">
                # {token_id}
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
