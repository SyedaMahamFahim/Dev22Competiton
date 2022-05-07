import React, { useEffect } from "react";
import AppWrapper from "../../wrapper/AppWrapper";
import { SectionTitle } from "../../components/index";
import { Box } from "@chakra-ui/react";
import dateFormat from "dateformat";
import {AiOutlineLink, AiFillProject } from "react-icons/ai";
import { useParams } from "react-router-dom";

import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProjectDetails,
} from "../../store/actions/projectAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import { CircularProgress, Center } from "@chakra-ui/react";
const Tasks = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { project, loading, error } = useSelector(
    (state) => state.projectDetails
  );

  useEffect(() => {
    if (error) {
      toast.error(error, {
        toastId: "error1",
        autoClose: 1000,
      });
      dispatch(clearErrors());
    }

    dispatch(getProjectDetails(params.id));
  }, [dispatch, params.id]);

  console.log(project);

  let allTaskArry = [];
  if (!loading) {
    allTaskArry = project.tasks || [];
  }
  const rows = [];

  if (allTaskArry.length > 0) {
    console.log("allTaskArry", allTaskArry);
    allTaskArry.map((item) =>
      rows.push({
        id: item._id,
        taskTitle: item.taskTitle,
        status: item.status,
        loggingTime: item.loggingTime,
        natureOfTask: item.natureOfTask,
        assigneUser:item.assigneUser.length || 0,
        createdAt: dateFormat(item.createdAt, "dd, mmmm, yyyy"),
        view:item._id
      })
    );
  }


  const columns = [

    {
      field: "taskTitle",
      headerName: "Title",
      minWidth: 100,
      flex: 0.25,
    },
    {
      field: "assigneUser",
      headerName: "Assignee",
      type: "number",
      minWidth: 50,
      flex: 0.3,
    },
    {
      field: "loggingTime",
      headerName: "Logging Time",
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: "natureOfTask",
      headerName: "Nature Of Task",
      minWidth: 100,
      flex: 0.5,
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
      renderCell: (cellValues) => {
        return (
          <>
            <Link
              to={`/project/${params.id}/task/${cellValues.row.id}`}
              style={{
                fontSize: "25px",
                margin: "5px",
                color: "#1A202C",
              }}
            >
              <AiOutlineLink />
            </Link>
            <Link
              to={`/project/${params.id}/task/${cellValues.row.id}`}
              style={{
                fontSize: "25px",
                margin: "5px",
                color: "#1A202C",
              }}
            >
              <AiFillProject />
            </Link>
          </>
        );
      },
    },
  ];
 

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
            text={"All Tasks"}
            align="center"
            variant="h1"
            subText={project.title}
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

export default AppWrapper(Tasks);
