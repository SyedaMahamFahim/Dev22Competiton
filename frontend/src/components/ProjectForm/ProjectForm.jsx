import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Box,
  Input,
  useColorModeValue,
  CircularProgress,
  Center,
} from "@chakra-ui/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";

import { createProject, clearErrors } from "../../store/actions/projectAction";
import { NEW_PROJECT_RESET } from "../../store/constants/projectConstant";

const ProjectForm = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newProject);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    let today = new Date();
    const myForm = new FormData();
    myForm.set("title", title);
    myForm.set("desc", desc);
    myForm.set("projectKey", today);

    dispatch(createProject(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "error1",
        autoClose: 1000,
      });
      dispatch(clearErrors())
    }
      if (success) {
        toast.success("Project Created Successfully", {
          toastId: "success1",
          autoClose: 1000,
        });
        dispatch({ type: NEW_PROJECT_RESET });
        
      }
    
  }, [dispatch, error, success]);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Center h="50vh">
          {" "}
          <CircularProgress isIndeterminate color="black" size={"3rem"} />
        </Center>
      ) : (
        <>
          <form
            onSubmit={createProductSubmitHandler}
            encType="multipart/form-data"
          >
            <Box
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              rounded={"lg"}
              p={6}
            >
              <FormControl mt={5} isRequired>
                <FormLabel htmlFor="title">Project Title</FormLabel>
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
              >
                {loading ? (
                  <CircularProgress isIndeterminate color="gray.50" />
                ) : (
                  "Create Project"
                )}
              </Button>
            </Box>
          </form>
        </>
      )}
    </>
  );
};

export default ProjectForm;;
