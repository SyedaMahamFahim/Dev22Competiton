import React,{useState} from "react";
import AppWrapper from "../../wrapper/AppWrapper";
import { SectionTitle, TaskForm } from "../../components/index";
import { Box } from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom'

const AddTask = () => {  
  const navigate = useNavigate();
  const [isRedirectToHome, setIsRedirectToHome] = useState(false);

  const sendDataToParent = (redirectedValue) => { 
    setIsRedirectToHome(redirectedValue)
  };

  if(isRedirectToHome) {
    navigate("/get-all-tasks");
  }
  return (
    <>
      <SectionTitle text={"Add New Tasks"} align="center" variant="h1" subText={"Create a new task"}/>
      <Box mt={{ base: "2rem" }} m={{ md: "1.5rem", lg: "3rem" }}>
        <TaskForm  
        sendDataToParent={sendDataToParent} 
        isRedirectToHomeParent={isRedirectToHome}
        />
      </Box>
    </>
  );
};

export default AppWrapper(AddTask);
