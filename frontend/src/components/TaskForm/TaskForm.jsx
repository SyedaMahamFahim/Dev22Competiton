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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import axios from "axios";
import baseUrl from "../../configuration/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";

import {
  getProjectDetails,
  clearErrors,
  newTask,
} from "../../store/actions/projectAction";
import { NEW_TASK_RESET } from "../../store/constants/projectConstant";

const TaskForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const params = useParams();
  const dispatch = useDispatch();

  const { project, loading, error } = useSelector(
    (state) => state.projectDetails
  );

  const { success, error: taskError } = useSelector((state) => state.newTask);
  const [allMembers, setAllMembers] = useState([]);

  const [taskTitle, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [assignUser] = useState([]);
  const [assignUserTask, setAssignUserTask] = useState("");

  // For Task
  const [allUsersEmail, setAllUsersEmail] = useState([]);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [userRole, setUserRole] = useState("");


  const [natureOfTask, setNature] = useState("");
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

    // Send Email
    const sendEmail = async () => {
   
      let dataSend = {
        email: assignUserTask,
        subject: "no-reply",
        message: "Project key",
      };
       await fetch(`${baseUrl}/api/v1/project/send-email`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        // HANDLING ERRORS
        .then((res) => {
          console.log(res);
          if (res.status > 199 && res.status < 300) {
            alert("Send Successfully !");
          }
        });
    };
  const taskSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    if (!loading && project !== null) {
      console.log(allMembers);
      myForm.set("taskTitle", taskTitle);
      myForm.set("description", description);
      myForm.set("natureOfTask", natureOfTask);
      myForm.set("projectKey", project.projectKey);
      myForm.set("projectId", project._id);
      myForm.set("assignUser", assignUser);
      myForm.set("status", status);
      myForm.set("startTime", startTime);
      myForm.set("endTime", "none");
      myForm.set("assigneUser", JSON.stringify(allMembers));

      myForm.set("loggingTime", "0");
      dispatch(newTask(myForm));
      sendEmail();
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
        toastId: "error2",
        autoClose: 1000,
      });
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Task Created Successfully", {
        toastId: "success1",
        autoClose: 1000,
      });
      dispatch({ type: NEW_TASK_RESET });
    }
  }, [dispatch, taskError, success]);

  const addMembers = () => {
    let memberInfo = {
      userRole: userRole,
      userEmail: assignUserTask,
    };
    setAllMembers([...allMembers, memberInfo]);
    onClose();
  };



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
          <form onSubmit={taskSubmitHandler} encType="multipart/form-data">
            <Box
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              rounded={"lg"}
              p={6}
            >
              <FormControl mt={5} isRequired>
                <FormLabel htmlFor="taskTitle">Task Title</FormLabel>
                <Input
                  id="title"
                  type="text"
                  name="taskTitle"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl mt={5} isRequired>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  name="description"
                  placeholder="Here is a sample placeholder"
                  size="sm"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FormControl>

              <FormControl mt={5} isRequired>
                <FormLabel htmlFor="natureOfTask">Nature Of Task</FormLabel>
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
                  <option value={"todo"} defaultValue={"todo"}>
                    Todo
                  </option>
                  <option value={"inprogress"}>In Progress</option>
                  <option value={"done"}>Done</option>
                  <option value={"closed"}>Closed</option>
                </Select>
              </FormControl>

              <FormControl mt={5} isRequired>
                <FormLabel>Assign Task </FormLabel>
                <Button
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
                  onClick={onOpen}
                >
                  Add Member
                </Button>
              </FormControl>
              <Box>
                All Selected User
                {allMembers.map((val) => val.userEmail)}
              </Box>

              <FormControl mt={5}>
                <FormLabel htmlFor="assign-user">Start Time</FormLabel>

                <DateTimePicker onChange={setStartTime} value={startTime} />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel htmlFor="assign-user">End Time</FormLabel>

                <DateTimePicker onChange={setEndTime} value={endTime} />
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

          {/* Modal */}
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Member</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl mt={5} isRequired>
                  <FormLabel htmlFor="assign-user">Assign Team Mate.</FormLabel>

                  <Select
                    id="status"
                    placeholder="Select select"
                    name="status"
                    onChange={(e) => setAssignUserTask(e.target.value)}
                  >
                    {allUsersEmail.map((val) => (
                      <option key={val.value + 1} value={val.value}>
                        {val.value}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mt={5} isRequired>
                  <FormLabel htmlFor="status">Select User Role</FormLabel>
                  <Select
                    id="status"
                    placeholder="Select select"
                    name="status"
                    onChange={(e) => setUserRole(e.target.value)}
                  >
                    <option value={"team-member"} defaultValue={"team-member"}>
                      Team Member
                    </option>

                    <option value={"administrator"}>Administrator</option>
                  </Select>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={addMembers}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default TaskForm;
