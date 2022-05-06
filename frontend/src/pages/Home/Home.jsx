import React  from "react";
import AppWrapper from "../../wrapper/AppWrapper";
import GetApiWrapper from "../../wrapper/GetApiWrapper";

// import { SectionTitle } from "../../components/index";
// import todoUrl from "../configuration/todoUrl";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";

const Home = () => {
  // const [loading, setLoading] = useState(false);
  // const [errors, setErrors] = useState(false);
  // const [data, setData] = useState("");

  // const errorHandler = () => {
  //   if (errors) {
  //     toast.error("Network Error, Please Try Again Later", {
  //       autoClose: 3000,
  //       toastId: "todoerror1",
  //     });
  //   }
  // };

  // const getAllTaskData = async () => {
  //   setLoading(true);
  //   await axios
  //     .get(`${todoUrl}/api/v1/todo-controllers/get-all-todos/`)
  //     .then(({ data }) => {
  //       const filterData = data.todo.filter(
  //         (val) => val.emailAddress === localStorage.getItem("userEmail")
  //       );
  //       const priorityTask = filterData.filter(
  //         (val) => val.status === "pending" || val.status === "active"
  //       );
  //       setData(priorityTask);
  //       setLoading(false);
  //       setErrors(false);
  //     })
  //     .catch((err) => {
  //       setErrors(true);
  //       toast.error(err.message, {
  //         autoClose: 1000,
  //         toastId: "todoerror1",
  //       });
  //       setLoading(false);
  //     });

  //   errorHandler();
  // };
  return (
    <>
      <GetApiWrapper
    status={"pending || active"}
    endPoint={"get-all-todos"}
    pageTitle={'Home'}
    pageSubTitle={'Priority Tasks'}
    />
    </>
  );
};

export default AppWrapper(Home);
