import { Box, Text } from "@chakra-ui/layout";
import { Metadata } from "./Metadata";
import { NFT } from "./NFT";
import { Image } from "@chakra-ui/react";

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
      <div>
        <Box bg="tomato">
          <Image src={meta.image} />
          <Text>Name:{name}</Text>
          <Text>Symbol: {symbol}</Text>
          <Text>Token ID: {token_id}</Text>
          <Text>{meta.name}</Text>
        </Box>
      </div>
    );
  } else {
    return (
      <div>
        <Box bg="tomato">
          <Text>Name:{name}</Text>
          <Text>Symbol: {symbol}</Text>
          <Text>Token ID: {token_id}</Text>
        </Box>
      </div>
    );
  }
};

export default NftComponent;
