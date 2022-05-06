import { useState } from "react";
import axios from "axios";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        "http://net-lb-syeda-49a2339-1223006815.us-west-2.elb.amazonaws.com:8080/login",
        {
          email: email,
          password: password,
        }
      )
      .then((res) => {
        console.log("after login success", res);
      })
      .catch((err) => {
        console.log("login Error", err.response);
      });
  };
  return (
    <div className="form">
      <div>
        <h1>User Registration</h1>
      </div>

      <form>
        <br />
        <br />
        <label className="label">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          value={email}
          type="email"
        />
        <br />
        <br />
        <label className="label">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          value={password}
          type="password"
        />
        <br />
        <br />
        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default App;
