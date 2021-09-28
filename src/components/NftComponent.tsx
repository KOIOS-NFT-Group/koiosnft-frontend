import { Box, Text } from "@chakra-ui/layout";
import { NFT } from "./NFT";

const NftComponent = ({
  id,
  token_address,
  token_id,
  owner_of,
  contract_type,
  token_uri,
  metadata,
  amount,
  name,
  symbol,
}: NFT) => (
  <div data-id={id}>
    <Box bg="tomato">
      <Text>Name: {name}</Text>
      <Text>Symbol: {symbol}</Text>
      <Text>Token ID: {token_id}</Text>
    </Box>
  </div>
);

export default NftComponent;
