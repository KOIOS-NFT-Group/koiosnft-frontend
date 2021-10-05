import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { NFT } from "./NFT";
import { SimpleGrid, Text } from "@chakra-ui/react";
import NftComponent from "./NftComponent";
import { NFTKey } from "./NFTKey";
import { Network } from "../services/Network";

const ContentBody = ({ chainId, name }: Network) => {
  const { isAuthenticated, user } = useMoralis();

  const { account } = useMoralisWeb3Api();

  let amountOfNfts: NFT[] = [];

  const [nfts, setNfts] = useState(amountOfNfts);

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
            const nftArray = response.result!;

            setNfts(nftArray);
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
            const nftArray = response.result!;

            setNfts(nftArray);
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
            const nftArray = response.result!;

            setNfts(nftArray);
          };
          fetchNFTs();
          break;
        }
      }
    }
  }, [name]);

  const nftBoxes = () => {
    if (isAuthenticated) {
      return (
        <>
          <SimpleGrid minChildWidth="250px" spacing="5px">
            {nfts.map((nft: NFT, i) => (
              <NftComponent key={i} {...nft} />
            ))}
          </SimpleGrid>
        </>
      );
    } else {
      return <Text>Connect wallet lol</Text>;
    }
  };

  return <div>{nftBoxes()}</div>;
};
export default ContentBody;
