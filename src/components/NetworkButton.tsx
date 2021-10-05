import { Button } from "@chakra-ui/react";
import { Network } from "../services/Network";

const NetworkButton = ({ chainId, name }: Network) => {
  const capitalize = (): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  let niceName: string = capitalize();

  return (
    <Button variant="outline" isDisabled m={2}>
      {niceName}
    </Button>
  );
};
export default NetworkButton;
