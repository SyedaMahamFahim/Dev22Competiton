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
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import baseUrl from "../../configuration/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  createProject,
  getProjectDetails,
  clearErrors,
  newTask,
} from "../../store/actions/projectAction";
import { NEW_PROJECT_RESET } from "../../store/constants/projectConstant";

// import emailjs from '@emailjs-com';

const TaskForm = ({ isNewProject }) => {
  const { isOpen, onToggle } = useDisclosure();
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newProject);
  const { project, loading: projectLoading, error: projectError } = useSelector(
    (state) => state.projectDetails
  );
  // For Project
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
    let today = new Date();
    const myForm = new FormData();

    if (isNewProject) {
      myForm.set("title", title);
      myForm.set("desc", desc);
      myForm.set("nature", nature);
      myForm.set("projectKey", today);
    } else {
      myForm.set("assignUser", assignUser);
      myForm.set("status", status);
    }

    dispatch(createProject(myForm));
  };

  useEffect(() => {
    getAllUserEmail();
    if (isNewProject) {
      if (error) {
        toast.error(error, {
          toastId: "error1",
          autoClose: 1000,
        });
      }

      if (success) {
        toast.success("Project Created Successfully", {
          toastId: "success1",
          autoClose: 1000,
        });
        dispatch({ type: NEW_PROJECT_RESET });
      }
    } else {
      console.log(params.id);
      if (!isNewProject) {
        dispatch(getProjectDetails(params.id));
if(!projectLoading){console.log(project);
  console.log(isNewProject);}
        
      }
    }
  }, [dispatch, error, success]);

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
                  {isNewProject ? "Project " : "Task "}
                  Title
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

              {!isNewProject && (
                <>
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
                        Select his/her email.
                      </FormLabel>

                      <Select
                        id="status"
                        placeholder="Select select"
                        name="status"
                        onChange={(e) => setAssignUser(e.target.value)}
                      >
                        {allUsersEmail.map((val) => (
                          <option key={val} value={val}>
                            {val}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </ScaleFade>
                </>
              )}

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
