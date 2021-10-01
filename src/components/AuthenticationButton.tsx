import { Button, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import checkWeb3 from "../services/NetworkTracker";

interface Web3Enabled {
  hasWeb3: boolean;
}

const AuthButtons = ({ hasWeb3 }: Web3Enabled) => {
  const { authenticate, isAuthenticated, isAuthenticating, logout } =
    useMoralis();

  const values = useBreakpointValue({
    base: "Connect 👛",
    md: "Connect Wallet 👛",
  });

  const valuesConnected = useBreakpointValue({
    base: "Connected ✅",
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
    if (!hasWeb3) {
      return (
        <Button
          m={2}
          fontSize={{ base: "sm", md: "sm", lg: "md" }}
          onClick={() => {
            authenticate({
              signingMessage: "Sign message to confirm ownership of address",
            });
          }}
        >
          Press to unlock your Metamask 👛
        </Button>
      );
    } else {
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
              authenticate({
                signingMessage: "Sign message to confirm ownership of address",
              });
            }}
          >
            {values}
          </Button>
        );
      }
    }
  };

  return AuthState();
};

export default AuthButtons;
