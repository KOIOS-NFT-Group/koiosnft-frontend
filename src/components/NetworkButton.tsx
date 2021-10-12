import { Button } from "@chakra-ui/react";
import { Network } from "../services/Network";

const NetworkButton = ({ chainId, networkName }: Network) => {
  const capitalize = (): string => {
    if (networkName) {
      return networkName.charAt(0).toUpperCase() + networkName.slice(1);
    } else {
      return "Unsupported!";
    }
  };

  let niceName: string = capitalize();

  return (
    <Button variant="outline" isDisabled m={2}>
      {niceName}
    </Button>
  );
};
export default NetworkButton;
