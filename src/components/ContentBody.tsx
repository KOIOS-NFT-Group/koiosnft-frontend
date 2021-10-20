import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { NFT } from "./NFT";
import { VStack, Text } from "@chakra-ui/react";
import { Network } from "../services/Network";
import { Mapping } from "./Mapping";
import Collection from "./Collection";

const ContentBody = ({ chainId, networkName }: Network) => {
  const { isAuthenticated, user } = useMoralis();

  const { account } = useMoralisWeb3Api();

  let mappedItemsEmpty: Mapping[] = [];
  const [mappedItems, setMappedItems] = useState(mappedItemsEmpty);

  const mapIt = (nftArray: NFT[]): Map<string, NFT[]> => {
    let mapping = new Map<string, NFT[]>();
    for (let nft of nftArray) {
      if (!mapping.has(nft.token_address)) {
        let arrayOfItems: NFT[] = [];
        for (let nft2 of nftArray) {
          if (nft2.token_address === nft.token_address) {
            arrayOfItems.push(nft2);
          }
        }
        mapping.set(nft.name, arrayOfItems);
      }
    }
    return mapping;
  };

  const createMappingArray = (mapping: Map<string, NFT[]>): Mapping[] => {
    let mappingArray: Mapping[] = [];
    for (let key of mapping.entries()) {
      let map: Mapping = mapItems(key[0], key[1]);
      mappingArray.push(map);
    }
    return mappingArray;
  };

  useEffect(() => {
    if (isAuthenticated) {
      switch (networkName) {
        case "eth": {
          const userAddr = user?.get("ethAddress");
          const fetchNFTs = async () => {
            const response = await account.getNFTs({
              chain: "eth",
              address: userAddr,
            });
            const nftArray = response.result!;
            nftArray.sort((a, b) =>
              a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            );

            let mapped: Map<string, NFT[]> = mapIt(nftArray);
            setMappedItems(createMappingArray(mapped));
          };
          fetchNFTs();
          break;
        }
        case "rinkeby": {
          const userAddr = user?.get("ethAddress");
          const fetchNFTs = async () => {
            const response = await account.getNFTsForContract({
              chain: "rinkeby",
              address: userAddr,
              token_address: "0xc5d26Ed816da61e5d633BcEa3Fc0055BD81A96A7",
            });
            const nftArray = response.result!;
            nftArray.sort((a, b) =>
              a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            );

            let mapped: Map<string, NFT[]> = mapIt(nftArray);
            setMappedItems(createMappingArray(mapped));
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
            nftArray.sort((a, b) =>
              a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            );
            let mapped: Map<string, NFT[]> = mapIt(nftArray);

            setMappedItems(createMappingArray(mapped));
          };
          fetchNFTs();
          break;
        }
      }
    }
  });

  const mapItems = (key: string, values: NFT[]): Mapping => {
    let mapper: Mapping = {
      collectionName: key,
      collectionValues: values,
    };
    return mapper;
  };

  const nftBoxes = () => {
    if (isAuthenticated) {
      if (networkName !== "unsupported") {
        return (
          <VStack>
            {mappedItems &&
              mappedItems.map((map: Mapping, i) => (
                <Collection key={i} {...map} />
              ))}
          </VStack>
        );
      } else {
        return <Text>Wrong network!</Text>;
      }
    } else {
      return <></>;
    }
  };

  return <div>{nftBoxes()}</div>;
};
export default ContentBody;
