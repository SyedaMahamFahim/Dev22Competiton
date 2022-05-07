import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login, clearErrors } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  CircularProgress,
  Image,
} from "@chakra-ui/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated,user } = useSelector(
    (state) => state.user
  );

  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    if (signUp) {
      myForm.set("firstName", firstName);
      myForm.set("lastName", lastName);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("avatar", avatar);


      dispatch(register(myForm));
    } else {
      myForm.set("email", email);
      myForm.set("password", password);
 console.log(user)
       dispatch(login(email, password));
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
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

    if (isAuthenticated) {
      setSignUp(false);
    }

    if (isAuthenticated && !signUp) {
      // localStorage.setItem("token", email);
      navigate("/home");
    }

    if (!isAuthenticated) {
      navigate("/")
    }else{
      navigate("/home")
    }
    let getUserToken = localStorage.getItem("token");
    if (
      getUserToken === undefined ||
      getUserToken === null ||
      getUserToken === ""
    ) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, [dispatch, error, isAuthenticated]);

  return (
    <>
      <ToastContainer />

      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>
              {signUp ? "Create your account" : "Sign in to your account"}
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <form encType="multipart/form-data" onSubmit={registerSubmit}>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                {signUp && (
                  <FormControl id="email">
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                )}
                {signUp && (
                  <FormControl id="email">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                )}

                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                {signUp && (
                  <FormControl id="email">
                    <FormLabel>Avatar</FormLabel>
                    {avatarPreview !== "" && (
                      <Image
                        boxSize="100px"
                        objectFit="cover"
                        src={avatarPreview}
                        alt={firstName}
                        m={3}
                      />
                    )}

                    <Input
                      type="file"
                      accept="image/*"
                      name="avatar"
                      onChange={registerDataChange}
                    />
                  </FormControl>
                )}
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"center"}
                    justify={"center"}
                  >
                    <Text
                      fontSize="md"
                      color={"blue.400"}
                      cursor={"pointer"}
                      onClick={() => setSignUp(!signUp)}
                    >
                      {signUp
                        ? "Already has an account?"
                        : "Create a new account"}
                    </Text>
                  </Stack>
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    // onClick={loginForm}
                  >
                    {loading ? (
                      <CircularProgress isIndeterminate color="gray.50" />
                    ) : signUp ? (
                      "Sign up"
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Flex>
    </>
  );
};

export default AuthForm;
