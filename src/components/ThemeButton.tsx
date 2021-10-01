import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";

function ThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} m={2}>
      {colorMode === "light" ? <SunIcon color="gray.900" /> : <MoonIcon />}
    </Button>
  );
}
export default ThemeButton;
