import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { NFT } from "./NFT";
import { Text, VStack } from "@chakra-ui/react";

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
      console.log(nfts);
      <VStack>
        {nfts.map((NFT, index) => (
          <Text key={index}>{NFT.name}</Text>
        ))}
      </VStack>;
    } else {
      return <Text>Connect wallet lol</Text>;
    }
  };

  return <div>{nftBoxes()}</div>;
}
export default ContentBody;
