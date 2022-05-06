import React, { useEffect, useState } from "react";

import {
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Button,
  ScaleFade,
  Box,
  Input,
  useColorModeValue,
  Switch,
  useDisclosure,
  CircularProgress,
  Center
} from "@chakra-ui/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProject } from "../../store/actions/projectAction";
import { NEW_PROJECT_RESET } from "../../store/constants/projectConstant";


const TaskForm = ({isNewProject}) => {
  const { isOpen, onToggle } = useDisclosure();

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newProject);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignUser, setAssignUser] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("");
  const [nature, setNature] = useState("");


  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    if(isNewProject){
      myForm.set("title", title);
      myForm.set("desc", desc);
      myForm.set("nature", nature);
    }else{
      myForm.set("assignUser", assignUser);
      myForm.set("tag", tag,);
      myForm.set("status", status);
    }
 
   
    dispatch(createProject(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "error1",
        autoClose: 1000,
      });
     
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully", {
        toastId: "success1",
        autoClose: 1000,
      });
      // dispatch({ type: NEW_PROJECT_RESET });
    }
  }, [dispatch, error, success]);
 

  return (
    <>
     <ToastContainer />
      {loading ? (
        <Center h='50vh'> <CircularProgress isIndeterminate color="black" size={"3rem"}/></Center>
       
      ) : (
        <>
        <form  onSubmit={createProductSubmitHandler}
                encType="multipart/form-data">
          <Box
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
          >
            
            <FormControl mt={5} isRequired>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl mt={5} isRequired>
              <FormLabel htmlFor="desc">Description</FormLabel>
              <Textarea
                name="desc"
                placeholder="Here is a sample placeholder"
                size="sm"
                onChange={(e) => setDesc(e.target.value)}
              />
            </FormControl>

            <FormControl mt={5} isRequired>
              <FormLabel htmlFor="desc">Nature Of Task</FormLabel>
              <Select
                id="status"
                placeholder="Select select"
                name="status"
                onChange={(e) => setNature(e.target.value)}
              >
                <option value={"bug"}>Bug</option>
                <option value={"feature"}>Feature</option>
              </Select>
            </FormControl>
           
           {
             !isNewProject && <>
             
             <FormControl mt={5} isRequired>
              <FormLabel htmlFor="status">Status</FormLabel>
              <Select
                id="status"
                placeholder="Select select"
                name="status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={"active"}>Active</option>
                <option value={"pending"}>Pending</option>
              </Select>
            </FormControl>
            <FormControl display="flex" alignItems="center" mt={8}>
              <FormLabel htmlFor="is-assign" mb="0">
                Want to assign this task to someone?
              </FormLabel>
              <Switch id="is-assign" onChange={onToggle} />
            </FormControl>
            <ScaleFade initialScale={0.9} in={isOpen}>
              <FormControl mt={5}>
                <FormLabel htmlFor="assign-user">
                  Enter his/her email.
                </FormLabel>

                <Input
                  id="assign-user"
                  type="email"
                  name="assignUser"
                  onChange={(e) => setAssignUser(e.target.value)}
                />
              </FormControl>
            </ScaleFade>
             </>
           }
           
           

            <Button
             type="submit"
              mt={5}
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
              // onClick={formSubmission}
            >
              {loading ? (
                      <CircularProgress isIndeterminate color="gray.50" />
                    ) : isNewProject ? (
                      "Create Project"
                    ) : (
                      "Create Task"
                    )}
              
            </Button>
          </Box>
          </form>
        </>
      )}
    </>
  );
};

export default TaskForm;
