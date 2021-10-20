import { Button, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import checkWeb3 from "../services/NetworkTracker";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { update, toggleLoading } from "../features/network/network-slice";
import NetworkState from "../features/network/NetworkState";

const AuthButtons = () => {
  const { authenticate, isAuthenticated, isAuthenticating, logout, user } =
    useMoralis();

  const userAddress = useAppSelector((state) => state.network.account);
  const dispatch = useAppDispatch();

  const values = useBreakpointValue({
    base: "Connect 👛",
    md: "Connect Wallet 👛",
  });

  const valuesConnected = useBreakpointValue({
    base: userAddress + " ✅",
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

  const authenticateWallet = () => {
    dispatch(toggleLoading());
    authenticate({
      signingMessage: "Sign message to confirm ownership of address",
    });
    if (isAuthenticated) {
      const userAddress = user?.get("ethAddress");

      // let newState: NetworkState = {
      //   loading:
      //   account: userAddress
      // };
    }
  };

  const AuthState = () => {
    checkWeb3();
    if (isAuthenticated) {
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
          onClick={() => {
            authenticateWallet();
          }}
        >
          {values}
        </Button>
      );
    }
  };

  return AuthState();
};

export default AuthButtons;
