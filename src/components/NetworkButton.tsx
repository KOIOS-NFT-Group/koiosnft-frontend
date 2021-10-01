import { Button } from "@chakra-ui/react";
import { Network } from "../services/Network";

const NetworkButton = ({ chainId, name }: Network) => {
  return (
    <Button variant="outline" isDisabled m={2}>
      {name}
    </Button>
  );
};
export default NetworkButton;
