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
}) => {


  
  return (
    <>
      <ToastContainer />

      <Box
        my={{ base: "1rem" }}
        mx={{ base: "1rem", md: "1.5rem", lg: "1rem" }}
        mb={{ md: "1.5rem", lg: "2rem" }}
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.600")}
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
        </Flex>

        <Heading fontSize={"2xl"} fontFamily={"body"}>
          title
          {/* {title.length < 7 ? title : `${title.slice(0, 15)} ...`} */}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} my={4}>
          Created At <>&nbsp;</>
          {/* {dateFormat(createdAt, "dddd, mmmm dS, yyyy,")} */}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          desc
          {/* {desc.length < 25 ? desc : `${desc.slice(0, 25)} ...`} */}
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            status
            {/* {status} */}
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            tag
            {/* {tag.length < 10 ? `#${tag}` : `#${tag.slice(0, 10)} ...`} */}
          </Badge>
        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}>
       
            <Link to={`/project/${_id}`}>
              <Button  flex={1}
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
View
              </Button>
              </Link>
          
        </Stack>
      </Box>
    </>
  );
};

export default TaskCard;
