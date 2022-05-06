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
  Divider
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import todoUrl from "../../configuration/todoUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";

const SingleTask = () => {
  const params = useParams();
  const id = params.id;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  const getTaskData = async () => {
    setLoading(true);
    await axios
      .get(`${todoUrl}/api/v1/todo-controllers/get-todo/${id}`)
      .then(({ data: { todo } }) => {
        setData(todo);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message, {
          autoClose: 1000,
          toastId: "todoerror1",
        });
      });
  };

  useEffect(() => {
    getTaskData();
    console.log(data);
  }, []);

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
        {console.log(data)}
          <SectionTitle
            text={data.title}
            align="center"
            variant="h1"
            subText={`Created At 
       ${dateFormat(data.createdAt, "dddd, mmmm dS, yyyy,")}`}
          />
          <Box
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
          >
            <Box>
              <Heading>Title</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                {data.title}
              </Text>
            </Box>
            <Divider/>
            <Box mt={'1.75rem'}>
              <Heading>Description</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                {data.desc}
              </Text>
            </Box>
            <Divider/>
            <Box mt={'1.75rem'}>
              <Heading>Status</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                {data.status}
              </Text>
            </Box>
            
            <Divider/>
            <Box mt={'1.75rem'}>
              <Heading>Tag</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                {data.tag}
              </Text>
            </Box>

            <Divider/>
            <Box mt={'1.75rem'}>
              <Heading>Assignee User</Heading>
              <Text fontWeight={600} color={"gray.500"} my={4}>
                {data.assignUserEmailAddress}
              </Text>
            </Box>
            
            {
              data.assignUserEmailAddress !== 'none' && <>
              <Divider/>
              <Box mt={'1.75rem'}>
                <Heading>Assigned By</Heading>
                <Text fontWeight={600} color={"gray.500"} my={4}>
                  {data.emailAddress}
                </Text>
              </Box>
              </>
            }
          </Box>
        </>
      )}
    </>
  );
};

export default AppWrapper(SingleTask);
