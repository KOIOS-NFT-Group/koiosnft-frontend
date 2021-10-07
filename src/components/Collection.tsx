import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/react";
import { Mapping } from "./Mapping";
import { NFT } from "./NFT";
import NftComponent from "./NftComponent";

const Collection = (props: Mapping) => {
  let items: NFT[] = [];
  if (props.collectionValues) {
    items = props.collectionValues;
  }
  for (let item of items) {
    console.log(item);
  }
  const printItems = () => {
    for (let item of items) {
      return <Text>{item.token_address}</Text>;
    }
    console.log(items);
  };

  return (
    <>
      <Box
        overflow="scroll"
        p={2}
        minWidth="100%"
        border="2px"
        borderRadius="12px"
        m={2}
        borderColor="rgba(179,184,212,1)"
      >
        <VStack>
          <Heading>{props.collectionName}</Heading>
          <Divider border="2px" />
        </VStack>
        <SimpleGrid mt={5} minChildWidth="250px" spacing="5px">
          <Center>
            {props.collectionValues &&
              props.collectionValues.map((nft: NFT, i) => (
                <NftComponent key={i} {...nft} />
              ))}
          </Center>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Collection;
