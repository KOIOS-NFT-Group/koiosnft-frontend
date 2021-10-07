import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { NFT } from "./NFT";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import NftComponent from "./NftComponent";
import { NFTKey } from "./NFTKey";
import { Network } from "../services/Network";
import { Mapping } from "./Mapping";
import Collection from "./Collection";

const ContentBody = ({ chainId, name }: Network) => {
  const { isAuthenticated, user } = useMoralis();

  const { account } = useMoralisWeb3Api();

  let amountOfNfts: NFT[] = [];

  let mappedItemsEmpty: Mapping[] = [];
  const [mappedItems, setMappedItems] = useState(mappedItemsEmpty);

  const mapIt = (nftArray: NFT[]): Map<string, NFT[]> => {
    let mapping = new Map<string, NFT[]>();
    for (let nft of nftArray) {
      if (!mapping.has(nft.token_address)) {
        let arrayOfItems: NFT[] = [];
        for (let nft2 of nftArray) {
          if (nft2.token_address == nft.token_address) {
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
      switch (name) {
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
            const response = await account.getNFTs({
              chain: "rinkeby",
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
  }, [name]);

  const mapItems = (name: string, values: NFT[]): Mapping => {
    let mapper: Mapping = {
      collectionName: name,
      collectionValues: values,
    };
    return mapper;
  };
  const nftBoxes = () => {
    if (isAuthenticated) {
      return (
        <>
          <VStack>
            {mappedItems &&
              mappedItems.map((map: Mapping, i) => (
                <Collection key={i} {...map} />
              ))}
          </VStack>
        </>
      );
    } else {
      return <></>;
    }
  };

  return <div>{nftBoxes()}</div>;
};
export default ContentBody;
