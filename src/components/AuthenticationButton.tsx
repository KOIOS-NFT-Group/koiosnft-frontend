import { Button } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";

function AuthButtons() {
  const { authenticate, isAuthenticated, isAuthenticating, logout } =
    useMoralis();

  const AuthState = () => {
    if (isAuthenticated) {
      return (
        <Button
          fontSize={{ base: "sm", md: "sm", lg: "md" }}
          onClick={() => logout()}
        >
          Connected ✅
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
          Connect Wallet 👛
        </Button>
      );
    }
  };

  return AuthState();
}

export default AuthButtons;
