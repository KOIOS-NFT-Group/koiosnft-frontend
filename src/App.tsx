import React from "react";
import { useMoralis } from "react-moralis";
import { Button, Container, Heading } from "@chakra-ui/react";

function App() {
  const { authenticate, isAuthenticated, isAuthenticating, logout } =
    useMoralis();

  if (isAuthenticated) {
    return (
      <Container>
        <Heading>Welcome to the NFT test</Heading>
        <Button onClick={() => logout()}>Get me out!</Button>
      </Container>
    );
  }

  return (
    <div>
      <Button isLoading={isAuthenticating} onClick={() => authenticate()}>
        Authenticate
      </Button>
    </div>
  );
}

export default App;
