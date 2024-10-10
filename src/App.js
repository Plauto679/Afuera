import { useEffect, useState } from "react";
import { Box, Button, HStack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import SelectWalletModal from "./Modal";
import { truncateAddress } from "./utils";
import ProjectDescription from "./ProjectDescription";
import UserFundDetails from "./UserFundDetails";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [screen, setScreen] = useState("description");

  const connectWithProvider = async (provider) => {
    try {
      setProvider(provider);
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      if (accounts) setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const switchScreen = (screen) => setScreen(screen);

  return (
    <Box
      bg="blue.700"
      color="white"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Text fontSize="4xl" fontWeight="bold" color="white" mb={6}>
        Afuera no Afore {/* Main header */}
      </Text>

      <HStack spacing={4} mb={6}>
        <Button colorScheme="blue" onClick={() => switchScreen("description")}>
          Descripción del Proyecto
        </Button>
        <Button colorScheme="teal" onClick={() => switchScreen("fundDetails")}>
          Mis Detalles del Fondo
        </Button>
      </HStack>

      {!account ? (
        <Button colorScheme="purple" onClick={onOpen}>
          Conectar Wallet
        </Button>
      ) : (
        // Translated to Spanish
        <Text fontSize="lg" color="white">{`Conectado como: ${truncateAddress(account)}`}</Text>
      )}

      {/* Screen rendering logic */}
      <Box w="full" maxW="md" p={6} borderRadius="lg" boxShadow="lg" bg="white" color="black">
        {screen === "description" ? <ProjectDescription /> : <UserFundDetails account={account} />}
      </Box>

      <SelectWalletModal isOpen={isOpen} closeModal={onClose} connectWithProvider={connectWithProvider} />
    </Box>
  );
}
