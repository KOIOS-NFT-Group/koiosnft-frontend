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
        let fetchedNFTs: NFT[] = [];
        for (let nft of nftArray) {
          let key: NFTKey = {
            token_id: nft.token_id,
            token_address: nft.token_address,
          };
          let nftWithKey = {
            id: key,
            ...nft,
          };
          fetchedNFTs.push(nftWithKey);
        }
        setNfts(fetchedNFTs);
      };
      fetchNFTs();
    }
  }, [isAuthenticated]);

  const nftBoxes = () => {
    if (isAuthenticated) {
      return (
        <SimpleGrid minChildWidth="120px" spacing="10px">
          {nfts.map((nft: NFT) => (
            <NftComponent {...nft} />
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
