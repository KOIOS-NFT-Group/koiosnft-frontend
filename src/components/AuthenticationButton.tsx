import { Button, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import checkWeb3 from "../services/NetworkTracker";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { updateAddress } from "../features/network/network-slice";

const AuthButtons = () => {
  const { authenticate, isAuthenticated, isAuthenticating, logout, user } =
    useMoralis();

  const userAddress = useAppSelector((state) => state.network.account);
  const dispatch = useAppDispatch();

  const values = useBreakpointValue({
    base: "Connect 👛",
    md: "Connect Wallet 👛",
  });

  const trimNumber = (): string => {
    return (
      userAddress.slice(0, 4) +
      "..." +
      userAddress.slice(userAddress.length - 3, userAddress.length)
    );
  };

  const valuesConnected = useBreakpointValue({
    base: trimNumber() + " ✅",
  });

  const toast = useToast();

  const logoutWallet = () => {
    logout();
    toast({
      title: "Disconnected Succesfully",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };
  const AuthState = () => {
    checkWeb3();
    if (isAuthenticated) {
      dispatch(updateAddress(user?.get("ethAddress")!));
      return (
        <Button
          m={2}
          fontSize={{ base: "sm", md: "sm", lg: "md" }}
          onClick={() => {
            logoutWallet();
          }}
        >
          {valuesConnected}
        </Button>
      );
    } else {
      return (
        <Button
          m={2}
          isLoading={isAuthenticating}
          onClick={() =>
            authenticate({
              signingMessage: "Sign message to confirm ownership of address",
            })
          }
        >
          {values}
        </Button>
      );
    }
  };

  return AuthState();
};

export default AuthButtons;
