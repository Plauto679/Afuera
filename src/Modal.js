import {
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Image
} from "@chakra-ui/react";
import { getCoinbaseWalletProvider, getMetaMaskProvider } from "./providers";

export default function SelectWalletModal({ isOpen, closeModal, connectWithProvider }) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent w="300px">
        <ModalHeader>Select Wallet to Connect</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: "none" }} />
        <ModalBody paddingBottom="1.5rem">
          <VStack spacing={4}>
            <Button
              variant="outline"
              onClick={() => {
                const provider = getCoinbaseWalletProvider();
                connectWithProvider(provider);  // Use the passed connectWithProvider function
                closeModal();
              }}
              w="100%"
            >
              <HStack justifyContent="center">
                <Image src="/cbw.png" alt="Coinbase Wallet Logo" width={25} height={25} borderRadius="3px" />
                <Text>Coinbase Wallet</Text>
              </HStack>
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                const provider = getMetaMaskProvider();
                connectWithProvider(provider);  // Use the passed connectWithProvider function
                closeModal();
              }}
              w="100%"
            >
              <HStack justifyContent="center">
                <Image src="/mm.png" alt="Metamask Logo" width={25} height={25} borderRadius="3px" />
                <Text>MetaMask</Text>
              </HStack>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
