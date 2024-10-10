import React from "react";
import { VStack, Text } from "@chakra-ui/react";

function ProjectDescription() {
  return (
    <VStack spacing={4} align="start">
      <Text fontSize="2xl" fontWeight="bold">¿Qué es el Fondo de Retiro en Cripto?</Text> {/* Translated */}
      <Text fontSize="md" color="gray.600">
        El Fondo de Retiro en Cripto permite a los usuarios ahorrar para su retiro utilizando USDC en la blockchain BASE de Capa 2. Con bajas tarifas y alta seguridad, es una manera confiable de hacer crecer tus ahorros para el futuro.
      </Text> {/* Translated */}
      <Text fontSize="md" color="gray.600">
        Al conectar tu wallet, puedes depositar fondos, seguir tus contribuciones y ver los rendimientos proyectados.
      </Text> {/* Translated */}
    </VStack>
  );
}

export default ProjectDescription;
