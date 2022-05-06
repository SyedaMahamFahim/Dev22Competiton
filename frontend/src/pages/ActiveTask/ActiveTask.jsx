import React from 'react'
import AppWrapper from "../../wrapper/AppWrapper";
import GetApiWrapper from "../../wrapper/GetApiWrapper";
const ActiveTask = () => {
  return (
    <>
    <GetApiWrapper
    status={"active"}
    endPoint={"get-all-todos"}
    pageTitle={'Active Tasks'}
    pageSubTitle={'Current Important Tasks'}
    />
          </>
  )
}

export default AppWrapper(ActiveTask);

