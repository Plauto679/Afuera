import React, { useState, useEffect } from "react";
import { VStack, Text, Box, Button, Input, HStack } from "@chakra-ui/react";

function UserFundDetails({ account }) {
  const currentYear = new Date().getFullYear();

  const [fundData, setFundData] = useState({
    balance: "6000",
    contributions: "2500",
    returns: "12", // This is the percentage for Average Annual Yield
    startedYear: "2020",
    maturityYear: "2050",
    status: "Not Listed"  // Initial status set to "Not Listed"
  });

  const [contributeAmount, setContributeAmount] = useState(""); // State for user input

  // Function to handle contribution
  const handleContribute = () => {
    const contributionValue = parseFloat(contributeAmount);

    if (!isNaN(contributionValue) && contributionValue > 0) {
      setFundData((prevData) => ({
        ...prevData,
        balance: `${(parseFloat(prevData.balance) + contributionValue).toFixed(2)}`,
        contributions: `${(parseFloat(prevData.contributions) + contributionValue).toFixed(2)}`
      }));
      setContributeAmount(""); // Clear input after contribution
    }
  };

  // Function to handle listing the fund for sale
  const handleListToSale = () => {
    setFundData((prevData) => ({
      ...prevData,
      status: "On Sale" // Change status to "On Sale"
    }));
  };

  // Calculate Expected Retirement (Future Value)
  const calculateFutureValue = (balance, annualYield, yearsToMaturity) => {
    const futureValue = balance * Math.pow(1 + annualYield / 100, yearsToMaturity);
    return futureValue.toFixed(2);
  };

  const yearsToMaturity = fundData.maturityYear - currentYear;
  const expectedRetirement = calculateFutureValue(parseFloat(fundData.balance), parseFloat(fundData.returns), yearsToMaturity);

  return (
    <VStack spacing={4} align="start">
      <Text fontSize="2xl" fontWeight="bold" color="blue.600">Present Value</Text>
      {account ? (
        <>
          <Box w="full" p={4} borderWidth="1px" borderRadius="lg" bg="gray.50">
            <Text><strong>Wallet Address:</strong> {account}</Text>
            <Text><strong>Balance:</strong> {fundData.balance} USDC</Text>
            <Text><strong>Contributions:</strong> {fundData.contributions} USDC</Text>
            <Text><strong>Average Annual Yield:</strong> {fundData.returns}%</Text>
            <Text><strong>Started Year:</strong> {fundData.startedYear}</Text>
            <Text><strong>Maturity Year:</strong> {fundData.maturityYear}</Text>

            {/* Input and Contribute Button */}
            <HStack spacing={3} mt={4}>
              <Input
                placeholder="Deposit USDC"
                value={contributeAmount}
                onChange={(e) => setContributeAmount(e.target.value)}
                type="number"
                min="0"
                width="150px"
              />
              <Button colorScheme="green" onClick={handleContribute}>Contribute More</Button>
            </HStack>
          </Box>

          {/* Future Value Section */}
          <Box w="full" p={4} borderWidth="1px" borderRadius="lg" bg="gray.50" mt={6}>
            <Text fontSize="2xl" fontWeight="bold" color="blue.600">Future Value</Text>
            <Text><strong>Expected Retirement:</strong> {expectedRetirement} USDC</Text>
            <Text><strong>Years to Maturity:</strong> {yearsToMaturity} years</Text>

            {/* List to Sale Button */}
            <Button colorScheme="red" mt={4} onClick={handleListToSale}>List to Sale</Button> {/* New Button */}
            <Text mt={2}><strong>Status:</strong> {fundData.status}</Text> {/* Display status */}
          </Box>
        </>
      ) : (
        <Text fontSize="lg" color="gray.500">Please connect your wallet to view your fund details.</Text>
      )}
    </VStack>
  );
}

export default UserFundDetails;
