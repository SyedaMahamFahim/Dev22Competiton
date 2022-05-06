import React, { useRef } from "react";
import dateFormat from "dateformat";
import {
  Heading,
  Box,
  Text,
  Stack,
  Button,
  Badge,
  Flex,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import todoUrl from "../../configuration/todoUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const TaskCard = ({
  cardDetail: { title, desc, tag, status, _id, createdAt },
  index,
  sendDataToParent,
  priorityTaskStatus,
}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const redirectToTask = (id) => {
    navigate(`/update-task/${id}`);
  };
const redirectToTaskPage =(id)=>{
  navigate(`/task/${_id}`);
}
  const removeTask = async (id) => {
    await axios
      .delete(`${todoUrl}/api/v1/todo-controllers/delete-todo/${id}`)
      .then(({ data }) => {
        toast.success(data.message, {
          autoClose: 1000,
          toastId: "todoerror1",
        });
        onClose();
      })
      .catch((err) => {
        toast.error(err.message, {
          autoClose: 1000,
          toastId: "todoerror1",
        });
      });

    sendDataToParent(true);
  };

  return (
    <>
      <ToastContainer />

      <Box
        my={{ base: "1rem" }}
        mx={{ base: "1rem", md: "1.5rem", lg: "1rem" }}
        mb={{ md: "1.5rem", lg: "2rem" }}
        maxW={"320px"}
        w={"full"}
        bg={
          status === "completed"
            ? "#7cde98a6"
            : status === "pending"
            ? "#FFD19B"
            : useColorModeValue("white", "gray.600")
        }
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Flex align={"center"} justify={"space-between"} flexDirection={"row"}>
          <Box>
            <Text
              fontWeight={600}
              fontSize={"3xl"}
              color={"gray.500"}
              mb={4}
              align={"left"}
            >
              #{index + 1}
            </Text>
          </Box>
          <Box color={"blue"}>
            {priorityTaskStatus !== "pending || active" && (
              <Link to={`/task/${_id}`}>View</Link>
            )}
          </Box>
        </Flex>

        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {title.length < 7 ? title : `${title.slice(0, 15)} ...`}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} my={4}>
          Created At <>&nbsp;</>
          {dateFormat(createdAt, "dddd, mmmm dS, yyyy,")}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {desc.length < 25 ? desc : `${desc.slice(0, 25)} ...`}
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            {status}
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            {tag.length < 10 ? `#${tag}` : `#${tag.slice(0, 10)} ...`}
          </Badge>
        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}>
          {priorityTaskStatus !== "pending || active" && (
            <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
            onClick={onOpen}
          >
            Remove
          </Button>          )}
          

          {priorityTaskStatus !== "pending || active" ?
          <>
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
            onClick={() => redirectToTask(_id)}
          >
            Update
          </Button>
          </> 
          :
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
            onClick={() => redirectToTaskPage(_id)}
          >
            View
          </Button>

}
          
        </Stack>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => removeTask(_id)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default TaskCard;
