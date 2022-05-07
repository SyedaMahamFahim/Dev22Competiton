import React, { useState, useEffect } from "react";
import AppWrapper from "../../wrapper/AppWrapper";

import { SectionTitle, TaskCard } from "../../components/index";
import {
  CircularProgress,
  Center,
  Flex,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProjects,
  deleteProject,
} from "../../store/actions/projectAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const TileProjects = () => {
  const dispatch = useDispatch();
  const { loading, error, projects } = useSelector(
    (state) => state.allProjects
  );

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "error1",
        autoClose: 1000,
      });
      dispatch(clearErrors());
    }

    dispatch(getProjects());
  }, [dispatch, error]);

  console.log(projects)

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
        text={"Projects"}
        subText={"All projects"}
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
          {
              projects && projects.map((val,index)=> <TaskCard cardDetail={val} index={index} />
              )
          }
      </Flex>
    </>
      )}
    </>
  );
};

export default AppWrapper(TileProjects);

