import React,{useState} from "react";
import AppWrapper from "../../wrapper/AppWrapper";
import { SectionTitle, TaskForm } from "../../components/index";
import { Box } from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom'

const CreateTask = () => {  
  return (
    <>
      <SectionTitle text={"Add New Tasks"} align="center" variant="h1" subText={"Create a new task"}/>
      <Box mt={{ base: "2rem" }} m={{ md: "1.5rem", lg: "3rem" }}>
        <TaskForm  
        isNewProject={false}
        />
      </Box>
    </>
  );
};

export default AppWrapper(CreateTask);
