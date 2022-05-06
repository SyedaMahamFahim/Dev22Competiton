import React from "react";
import AppWrapper from "../../wrapper/AppWrapper";
import { SectionTitle, UpdateTaskForm } from "../../components/index";
import { Box } from "@chakra-ui/react";

import "react-toastify/dist/ReactToastify.css";

const UpdateTask = () => {
 
  return (
    <>
      <SectionTitle
        text={"Update The Task"}
        align="center"
        variant="h1"
      />

      <Box mt={{ base: "2rem" }} m={{ md: "1.5rem", lg: "3rem" }}>
        <UpdateTaskForm />
      </Box>
    </>
  );
};

export default AppWrapper(UpdateTask);
