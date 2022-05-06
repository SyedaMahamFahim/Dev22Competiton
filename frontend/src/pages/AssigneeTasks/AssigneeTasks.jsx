import React from 'react'
import AppWrapper from "../../wrapper/AppWrapper";
import GetApiWrapper from "../../wrapper/GetApiWrapper";
const ReporterTasks = () => {
  return (
    <>
    <GetApiWrapper
    status={"assignee-task"}
    endPoint={"get-all-todos"}
    pageTitle={'Assignee Tasks'}
    pageSubTitle={'The tasks has been assigned to you by someone'}
    />
          </>
  )
}

export default AppWrapper(ReporterTasks);


