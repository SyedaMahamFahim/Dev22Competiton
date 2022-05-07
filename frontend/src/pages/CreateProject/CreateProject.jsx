import React  from "react";
import AppWrapper from "../../wrapper/AppWrapper";
import { SectionTitle, ProjectForm } from "../../components/index";
import { Box } from "@chakra-ui/react";

const CreateProject = () => {  
  return (
    <>
      <SectionTitle text={"Add New Project"} align="center" variant="h1" subText={"Create a new task"}/>
      <Box mt={{ base: "2rem" }} m={{ md: "1.5rem", lg: "3rem" }}>
        <ProjectForm
        />
      </Box>
    </>
  );
};

export default AppWrapper(CreateProject);
