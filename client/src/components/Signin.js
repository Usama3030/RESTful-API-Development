import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:8081/api/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("EMAIL", res.data.email);
          // Move to home
          navigate("/");
        } else if (res.status === 404) {
          alert("Invalid Credentials.");
        } else {
          alert("Error: " + res.data.message); // Change this line
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <>
      <h1 className="center">SIGNIN</h1>
      <div className="outcard">
        <label>
          Email
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              setError(""); // Clear any previous error
            }}
            value={email}
            className="inputs"
            type="email"
          />
        </label>
        <br /> <br />
        <label>
          Password
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              setError(""); // Clear any previous error
            }}
            value={password}
            className="inputs"
            type="password"
          />
        </label>
        {error && <p className="error">{error}</p>}
        <br /> <br />
        <button type="button" onClick={handleSubmit} className="btns">
          SUBMIT
        </button>
        <Link
          style={{ textAlign: "center", display: "block", marginTop: "5px" }}
          to={"/signup"}
        >
          SIGN UP
        </Link>
      </div>
    </>
  );
}

export default Signin;
