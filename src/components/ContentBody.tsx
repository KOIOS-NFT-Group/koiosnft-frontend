import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { NFT } from "./NFT";

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
  }, []);

  return <h1>hi</h1>;
}
export default ContentBody;
