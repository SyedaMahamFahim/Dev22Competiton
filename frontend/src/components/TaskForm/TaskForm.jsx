import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Button,
  Box,
  Input,
  useColorModeValue,
  CircularProgress,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import baseUrl from "../../configuration/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getProjectDetails,
  clearErrors,
  newTask,
} from "../../store/actions/projectAction";
import { NEW_TASK_RESET } from "../../store/constants/projectConstant";
import { LocalizationProvider,DateTimePicker } from '@mui/x-date-pickers';
// import emailjs from '@emailjs-com';

const TaskForm = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { project, loading, error } = useSelector(
    (state) => state.projectDetails
  );

  const { success, error: taskError } = useSelector((state) => state.newTask);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignUser, setAssignUser] = useState("");

  // For Task
  const [allUsersEmail, setAllUsersEmail] = useState([]);

  const [startTime, setStartTime] = useState("9pm");
  const [endTime, setEndTime] = useState("10pm");
  const [logginTime, setLogginTime] = useState("10pm");

  const [nature, setNature] = useState("");
  const [status, setStatus] = useState("");

  // Get All Email
  const getAllUserEmail = async () => {
    await axios
      .get(`${baseUrl}/api/v1/user/get-all-users-email`)
      .then(({ data }) => {
        setAllUsersEmail([...allUsersEmail, ...data.allEmail]);
      })
      .catch((err) => {
        toast.error(err.message, {
          autoClose: 1000,
          toastId: "todoerror1",
        });
      });
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    if (!loading && project !== null) {
      myForm.set("title", title);
      myForm.set("desc", desc);
      myForm.set("nature", nature);
      myForm.set("projectKey", project.projectKey);
      myForm.set("projectId", project._id);
      myForm.set("assignUser", assignUser);
      myForm.set("status", status);
      myForm.set("startTime", startTime);
      myForm.set("endTime", endTime);
      myForm.set("loggingTime", logginTime);
      dispatch(newTask(myForm));
     
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "error1",
        autoClose: 1000,
      });
      dispatch(clearErrors());
    }
    dispatch(getProjectDetails(params.id));
    getAllUserEmail();
  }, [dispatch, params.id]);

  useEffect(() => {
    if (taskError) {
      toast.error(taskError, {
        toastId: "error1",
        autoClose: 1000,
      });
      dispatch(clearErrors());
    }
    if(success){
      toast.success("Task Created Successfully", {
        toastId: "success1",
        autoClose: 1000,
      });
      dispatch({ type: NEW_TASK_RESET });
    }

  }, [dispatch,taskError,success]);

  return (
    <>
      <ToastContainer />
      {loading && allUsersEmail.length !== 0 ? (
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
                <FormLabel htmlFor="title">
                  Task Title
                </FormLabel>
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
                
                    
                    <FormControl mt={5}>
                      <FormLabel htmlFor="assign-user">
                        Assign Team Mate.
                      </FormLabel>

                      <Select
                        id="status"
                        placeholder="Select select"
                        name="status"
                        onChange={(e) => setAssignUser(e.target.value)}
                      >
                        {allUsersEmail.map((val) => (
                          <option key={val + 1} value={val}>
                            {val}
                          </option>
                        ))}
                      </Select>
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
                // onClick={formSubmission}
              >
                {loading ? (
                  <CircularProgress isIndeterminate color="gray.50" />
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
