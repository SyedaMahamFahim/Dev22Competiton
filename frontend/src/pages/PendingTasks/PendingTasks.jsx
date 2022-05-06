import React from 'react'
import AppWrapper from "../../wrapper/AppWrapper";
import GetApiWrapper from "../../wrapper/GetApiWrapper";
const PendingTasks = () => {
  return (
    <>
    <GetApiWrapper
    status={"pending"}
    endPoint={"get-all-todos"}
    pageTitle={'Pending Tasks'}
    pageSubTitle={'Complete These Tasks ASAP'}
    />
          </>
  )
}

export default AppWrapper(PendingTasks);

