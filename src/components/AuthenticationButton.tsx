import { Button, useBreakpointValue } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";

function AuthButtons() {
  const { authenticate, isAuthenticated, isAuthenticating, logout } =
    useMoralis();

  const values = useBreakpointValue({
    base: "Connect 👛",
    md: "Connect Wallet 👛",
  });

  const valuesConnected = useBreakpointValue({
    base: "Connected ✅",
  });

  const AuthState = () => {
    if (isAuthenticated) {
      return (
        <Button
          fontSize={{ base: "sm", md: "sm", lg: "md" }}
          onClick={() => logout()}
        >
          {valuesConnected}
        </Button>
      );
    } else {
      return (
        <Button
          className="authButtons"
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
}

export default AuthButtons;
