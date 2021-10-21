import { Button, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { updateAddress } from "../features/network/network-slice";

const AuthButtons = () => {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    logout,
    user,
    Moralis,
  } = useMoralis();

  const userAddress = useAppSelector((state) => state.network.account);
  const web3 = useAppSelector((state) => state.network.web3);
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

  //   Moralis.Web3.onAccountsChanged(() => {
  //     logout();
  //       toast({
  //         title: "Account changed, please login.",
  //         status: "warning",
  //         duration: 2000,
  //         isClosable: true,
  //   });
  // }

  Moralis.Web3.onAccountsChanged(() => {
    logout();
    toast({
      title: "Account changed, please login.",
      status: "warning",
      duration: 2000,
      isClosable: true,
    });
  });

  const authenticateWallet = () => {
    authenticate({
      signingMessage: "Sign message to confirm ownership of address",
      onError: () =>
        toast({
          title: "User declined request.",
          status: "warning",
          duration: 2000,
          isClosable: true,
        }),
      onSuccess: () =>
        toast({
          title: "Connected Succesfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        }),
    });
  };

  const AuthState = () => {
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
          onClick={() => authenticateWallet()}
        >
          {values}
        </Button>
      );
    }
  };

  return AuthState();
};

export default AuthButtons;
