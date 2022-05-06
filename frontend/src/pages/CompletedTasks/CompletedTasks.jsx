import React from 'react'
import AppWrapper from "../../wrapper/AppWrapper";
import GetApiWrapper from "../../wrapper/GetApiWrapper";
const CompletedTasks = () => {
  return (
    <>
    <GetApiWrapper
    status={"completed"}
    endPoint={"get-all-todos"}
    pageTitle={'Completed Tasks'}
    pageSubTitle={'You Have Successfully Completed The Following Tasks'}
    />
          </>
  )
}

export default AppWrapper(CompletedTasks);

