import React, { useEffect } from "react";
import AppWrapper from "../../wrapper/AppWrapper";
import { SectionTitle } from "../../components/index";
import { Box } from "@chakra-ui/react";
import dateFormat from "dateformat";
import { AiFillDelete, AiOutlineLink, AiFillProject } from "react-icons/ai";

import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProjects,
  deleteProject,
} from "../../store/actions/projectAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { DELETE_PROJECT_RESET } from "../../store/constants/projectConstant";

import { CircularProgress, Center } from "@chakra-ui/react";
const Projects = () => {
  const dispatch = useDispatch();
  const { loading, error, projects } = useSelector(
    (state) => state.allProjects
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUpdateProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "error1",
        autoClose: 1000,
      });
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(error, {
        toastId: "error1",
        autoClose: 1000,
      });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      const confirmation = window.confirm("Do you want to delete the product?");
      if (confirmation) {
        toast.success("Project Deleted Successfully", {
          toastId: "error2",
          autoClose: 1000,
        });

        dispatch({ type: DELETE_PROJECT_RESET });
      }
    }

    dispatch(getProjects());
  }, [dispatch, alert, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Project ID", minWidth: 200, flex: 0.5 },

    {
      field: "title",
      headerName: "Title",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "projectKey",
      headerName: "Project Key",
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: "tasks",
      headerName: "Tasks",
      type: "number",
      minWidth: 50,
      flex: 0.3,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
           

            <Link
              to={`/project/${params.id}`}
              style={{
                fontSize: "25px",
                margin: "5px",
                color: "#1A202C",
              }}
            >
              <AiOutlineLink />
            </Link>

            <button
              className="btn btn-danger"
              color="white"
              style={{
                fontSize: "25px",
                margin: "5px",
                color: "#1A202C",
              }}
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <AiFillDelete />
            </button>
          </>
        );
      },
    },
  ];
  const rows = [];

  projects &&
    projects.forEach((item) => {
      rows.push({
        id: item._id,
        title: item.title.slice(0, 15),
        projectKey: item.projectKey,
        tasks: item.tasks.length,
        createdAt: dateFormat(item.createdAt, "dd, mmmm, yyyy"),
      });
    });
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
            text={"Projects"}
            align="center"
            variant="h1"
            subText={"All your created or assigned projects"}
          />
          <Box
            mt={{ base: "2rem" }}
            m={{ md: "1.5rem", lg: "3rem" }}
            bgColor="white"
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </Box>
        </>
      )}
    </>
  );
};

export default AppWrapper(Projects);
