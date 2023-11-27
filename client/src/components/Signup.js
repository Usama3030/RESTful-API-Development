import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  

  const handleSubmit = () => {
    // Basic client-side validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    axios
      .post("http://localhost:8081/api/signup", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Signup success.");
        } else if (res.status === 400) {
          alert("User Existed.");
        } else {
          alert("Error.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <>
      <h1 className="center">SIGNUP</h1>
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
        <button onClick={handleSubmit} className="btns">
          SUBMIT
        </button>
        <Link
          style={{ textAlign: "center", display: "block", marginTop: "5px" }}
          to={"/signin"}
        >
          SIGN IN
        </Link>
      </div>
    </>
  );
}

export default Signup;
