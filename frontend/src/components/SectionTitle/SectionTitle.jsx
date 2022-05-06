import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";

const SectionTitle = ({ text,subText }) => {
  return (
    <Box mb={5}>
      <Center>
        <Text fontSize="5xl" fontWeight={900}>{text}</Text> <br/>

      </Center>
      <Center>
        <Text fontSize="2xl" fontWeight={900}>{subText}</Text>

      </Center>
    </Box>
  );
};

export default SectionTitle;
