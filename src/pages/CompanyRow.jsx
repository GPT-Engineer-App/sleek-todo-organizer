import React, { useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const CompanyRow = ({ company }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} onClick={toggleDetails}>
      <Text fontWeight="bold">{company.name}</Text>
      <Text>ID: {company.id}</Text>
      {showDetails && (
        <VStack align="start" mt={4}>
          <Text>{company.address.street}</Text>
          <Text>{company.address.city}</Text>
          <Text>{company.address.postalCode}</Text>
        </VStack>
      )}
    </Box>
  );
};

export default CompanyRow;
