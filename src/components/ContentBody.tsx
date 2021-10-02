import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { NFT } from "./NFT";
import { SimpleGrid, Text } from "@chakra-ui/react";
import NftComponent from "./NftComponent";
import { NFTKey } from "./NFTKey";

function ContentBody() {
  const { isAuthenticated, user } = useMoralis();

  const { account } = useMoralisWeb3Api();

  let amountOfNfts: NFT[] = [];

  const [nfts, setNfts] = useState(amountOfNfts);

  useEffect(() => {
    if (isAuthenticated) {
      const userAddr = user?.get("ethAddress");
      const fetchNFTs = async () => {
        const response = await account.getNFTs({
          chain: "rinkeby",
          address: userAddr,
        });
        const nftArray = response.result!;

        setNfts(nftArray);
      };
      fetchNFTs();
    }
  }, [isAuthenticated]);

  const nftBoxes = () => {
    if (isAuthenticated) {
      return (
        <SimpleGrid minChildWidth="250px" spacing="5px">
          {nfts.map((nft: NFT, i) => (
            <NftComponent key={i} {...nft} />
          ))}
        </SimpleGrid>
      );
    } else {
      return <Text>Connect wallet lol</Text>;
    }
  };

  return <div>{nftBoxes()}</div>;
}
export default ContentBody;
