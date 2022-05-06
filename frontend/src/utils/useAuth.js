const useAuth = () => {
  let token = localStorage.getItem("token");
  console.log("this is token",token)
  if (token === null || token === undefined || token === "") {
    return false;
  } else if(token !== null || token !== undefined || token !== ""){
    return true;
  }
    
};

export default useAuth;
