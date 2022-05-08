import React, {useEffect } from "react";
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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getTaskDetails } from "../../store/actions/projectAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";

const SingleTask = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { loading, error, task } = useSelector((state) => state.taskDetails);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "error1",
        autoClose: 1000,
      });
      dispatch(clearErrors());
    }

    dispatch(getTaskDetails(params.id, params.taskId));
  }, [dispatch, params.id, params.taskId]);

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
            text={task.taskTitle}
            align="center"
            variant="h1"
            subText={`Created At 
       ${dateFormat(task.createdAt, "dddd, mmmm dS, yyyy,")}`}
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
                {task._id}
              </Text>
            </Box>
            <Divider />
            <Box my={4}>
              <Heading>Title</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                {task.taskTitle}
              </Text>
            </Box>
            <Divider />
            <Box mt={"1.75rem"}>
              <Heading>Description</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                {task.description}
              </Text>
            </Box>
            <Divider />
            <Box mt={"1.75rem"}>
              <Heading>Nature Of Task</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                {task.natureOfTask}
              </Text>
            </Box>
            <Divider />
            <Box mt={"1.75rem"}>
              <Heading>Status</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                {task.status}
              </Text>
            </Box>
            <Divider />
            <Box mt={"1.75rem"}>
              <Heading>Start Time</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                {dateFormat(task.startTime, "dddd, mmmm dS, yyyy,")}
              </Text>
            </Box>
            <Divider />
            <Box mt={"1.75rem"}>
              <Heading>Logging Time</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                Logging
              </Text>
            </Box>
            <Divider />
            <Box mt={"1.75rem"}>
              <Heading>End Time</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}></Text>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default AppWrapper(SingleTask);
