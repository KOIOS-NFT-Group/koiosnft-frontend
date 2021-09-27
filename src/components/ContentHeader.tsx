import { Heading, Text } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";

function ContentHeader() {
  const { isAuthenticated, user } = useMoralis();

  const HeaderOptions = () => {
    if (isAuthenticated) {
      const userData = user?.get("ethAddress");
      console.log(userData);
      return (
        <div>
          <Heading p={4} pl={2} fontSize={{ base: "md", lg: "2xl" }}>
            NFT Collection
          </Heading>
          <Text pl={2}>Address: {user?.get("ethAddress")}</Text>
        </div>
      );
    } else {
      return (
        <div>
          <Heading p={4} pl={2} fontSize={{ base: "md", lg: "2xl" }}>
            NFT Collection
          </Heading>
          <Text pl={2}>Please, connect your wallet.</Text>
        </div>
      );
    }
  };

  return HeaderOptions();
}
export default ContentHeader;
