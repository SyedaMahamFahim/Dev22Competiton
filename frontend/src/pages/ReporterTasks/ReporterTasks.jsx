import React from 'react'
import AppWrapper from "../../wrapper/AppWrapper";
import GetApiWrapper from "../../wrapper/GetApiWrapper";
const ReporterTasks = () => {
  return (
    <>
    <GetApiWrapper
    status={"reporter-task"}
    endPoint={"get-all-todos"}
    pageTitle={'Reporter Tasks'}
    pageSubTitle={'The tasks you have assigned to someone'}
    />
          </>
  )
}

export default AppWrapper(ReporterTasks);


