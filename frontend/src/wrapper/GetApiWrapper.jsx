import React, { useState, useEffect } from "react";
import { SectionTitle, TaskCard } from "../components/index";
import {
  CircularProgress,
  Center,
  Flex,
  Button,
  HStack,
} from "@chakra-ui/react";
import todoUrl from "../configuration/todoUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GetApiWrapper = ({ status, endPoint, pageTitle, pageSubTitle }) => {
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [isRedirectToHome, setIsRedirectToHome] = useState(false);

  const sendDataToParent = (redirectedValue) => {
    setIsRedirectToHome(redirectedValue);
  };
  const errorHandler = () => {
    if (errors) {
      toast.error("Network Error, Please Try Again Later", {
        autoClose: 3000,
        toastId: "todoerror1",
      });
    }
  };

  const getAllTaskData = async () => {
    setLoading(true);
    await axios
      .get(`${todoUrl}/api/v1/todo-controllers/${endPoint}/`)
      .then(({ data }) => {
        const filterData = data.todo.filter(
          (val) => val.emailAddress === localStorage.getItem("userEmail")
        );
        const priorityTask  = filterData.filter(
          (val) => val.status === 'active' || val.status ==='pending'
        );
        const reporterTasks = filterData.filter(
          (val) => val.assignUserEmailAddress !== "none"
        );
        const assigneeTasks = data.todo.filter(
          (val) => val.assignUserEmailAddress === localStorage.getItem("userEmail")
        );
        if (status === "all") {
          setCardDetails([...filterData]);
        } else if (status === "reporter-task") {
          setCardDetails([...reporterTasks]);
        } else if (status === "assignee-task") {
          setCardDetails([...assigneeTasks]);
          console.log(assigneeTasks,'assigneeTasks')
        } 
        else if (status === "pending || active") {
          setCardDetails([...priorityTask]);
          console.log(priorityTask,'priorityTask')
        }
        else {
          const filterStatus = filterData.filter(
            (val) => val.status === status
          );
          setCardDetails([...filterStatus]);
        }

        setLoading(false);
        setErrors(false);
      })
      .catch((err) => {
        setErrors(true);
        toast.error(err.message, {
          autoClose: 1000,
          toastId: "todoerror1",
        });
        setLoading(false);
      });

    errorHandler();
  };
  if (isRedirectToHome) {
    navigate("/home");
  }
  useEffect(() => {
    getAllTaskData();
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
          <SectionTitle
            text={pageTitle}
            subText={pageSubTitle}
            align="center"
            variant="h1"
          />
          <Flex
            wrap={"wrap"}
            align="center"
            justify="center"
            mt={{ base: "2rem", lg: "5rem" }}
            m={{ md: "1.5rem", lg: "2rem" }}
          >
            {cardDetails.length !== 0 ? (
              cardDetails.map((cardDetail, index) => (
                <TaskCard
                priorityTaskStatus={status === 'pending || active' ? 'pending || active' :'none' }
                  key={cardDetail._id}
                  cardDetail={cardDetail}
                  index={index}
                  sendDataToParent={sendDataToParent}
                  isRedirectToHomeParent={isRedirectToHome}
                />
              ))
            ) : (
              <>
                <HStack flexDirection={"column"}>
                  <Center h="50vh" flexDirection={"column"}>
                    {" "}
                    <SectionTitle
                      text={`There Is No ${
                        status === "completed"
                          ? "Completed"
                          : status === "pending"
                          ? "Pending"
                          : status === "active"
                          ? "Active"
                          : status === "reporter-task"
                          ? "Reporting"
                          : status === "assignee-task"
                          ? "Assignee"
                          : status === "pending || active"
                          ? "Priority"
                          : "All"
                      } Tasks`}
                      subText={""}
                      align="center"
                      variant="h1"
                    />
                    <br />
                    <br />
                    {status !== "assignee-task" && (
                      <Link to={"/add-tasks"}>
                        <Button
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
                          Add Task
                        </Button>
                      </Link>
                    )}
                  </Center>
                </HStack>
              </>
            )}
          </Flex>
        </>
      )}
    </>
  );
};

export default GetApiWrapper;
