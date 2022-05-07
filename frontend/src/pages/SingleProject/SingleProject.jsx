import React, { useState, useEffect } from "react";
import AppWrapper from "../../wrapper/AppWrapper";
import { SectionTitle } from "../../components/index";
import {
  Box,
  CircularProgress,
  Center,
  Heading,
  useColorModeValue,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProjectDetails,
} from "../../store/actions/projectAction";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";

const SingleProject = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { project, loading, error } = useSelector(
    (state) => state.projectDetails
  );

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "error1",
        autoClose: 1000,
      });
      dispatch(clearErrors());
    }

    dispatch(getProjectDetails(params.id));
  }, [dispatch, params.id]);
  let allTaskArry = [];
  if (!loading) {
    allTaskArry = project.tasks || [];
  }
  console.log("allTaskArry", allTaskArry.length);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Center h="50vh">
          {" "}
          <CircularProgress isIndeterminate color="black" size={"6rem"} />
        </Center>
      ) : (
        <>
          <SectionTitle
            text={project.title}
            align="center"
            variant="h1"
            subText={`Created At 
       ${dateFormat(project.createdAt, "dddd, mmmm dS, yyyy,")}`}
          />
          <Box
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
          >
            <Box>
              <Heading>Project Id</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                {project._id}
              </Text>
            </Box>
            <Divider />
            <Box my={4}>
              <Heading>Title</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                {project.title}
              </Text>
            </Box>
            <Divider />
            <Box mt={"1.75rem"}>
              <Heading>Project Key</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                {project.projectKey}
              </Text>
            </Box>
            <Divider />
            <Box mt={"1.75rem"}>
              <Heading>Total Tasks</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                {!loading && allTaskArry.length}
              </Text>
            </Box>

            <Button
              type="submit"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              mr={5}
              // onClick={loginForm}
            >
              <Link to={`/${project._id}/all-tasks`}>View All Tasks</Link>
            </Button>
            <Button
              type="submit"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              <Link to={`/${project._id}/create-task`}>Create New Task</Link>
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default AppWrapper(SingleProject);
