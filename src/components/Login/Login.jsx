import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import "./Login.css";

const Login = ({ loggedID, setLoggedID }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [emailId, setEmailId] = useState({ value: "", errorMessage: "" });
  const [password, setPassword] = useState({ value: "", errorMessage: "" });

  const emailOnChange = (e) => {
    setEmailId({
      value: e?.target?.value,
      errorMessage: e?.target?.value ? "" : "Required Field!",
    });
  };

  const passwordOnChange = (e) => {
    setPassword({
      value: e?.target?.value,
      errorMessage: e?.target?.value ? "" : "Required Field!",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailId?.value) {
      setEmailId({ value: "", errorMessage: "Required Field!" });
    }
    if (!password?.value) {
      setPassword({ value: "", errorMessage: "Required Field!" });
    }

    if (!emailId?.value || !password?.value) {
      messageApi.open({
        type: "error",
        content: "Found an empty field or invalid input",
      });
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/loginUser?email_id=${emailId?.value}&password=${password?.value}`
        );
        if (response?.data?.ok) {
          const loggedID = response?.data?.data?.loggedID;
          const user_email = response?.data?.data?.email;

          setEmailId({ value: "", errorMessage: "" });
          setPassword({ value: "", errorMessage: "" });

          messageApi.open({
            type: "success",
            content: response?.data?.message,
          });

          setTimeout(() => {
            setLoggedID(loggedID);
            localStorage.setItem('loggedID', loggedID);
            localStorage.setItem('user_email', user_email);
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        console.log("error:", error);
        messageApi.open({
          type: "error",
          content: error?.response?.data?.message,
        });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div id="loginCard">
        <div id="login" style={{ textAlign: "center" }}>
          <h2>
            Let's Go With <spna id="chatmailName">Chatmail</spna>
          </h2>
          <form onSubmit={handleSubmit} id="loginForm">
            <div className="text_area">
              <label
                for="email_id"
                style={{
                  color: emailId?.errorMessage ? "red" : "black",
                }}
              >
                Email ID{" "}
                <span className="inputError">
                  {emailId?.errorMessage ? ` - ${emailId?.errorMessage}` : ""}
                </span>
              </label>
              <input
                type="email"
                id="email_id"
                name="email_id"
                onChange={emailOnChange}
                value={emailId?.value}
                style={{ minWidth: "380px" }}
                placeholder="Enter Email ID"
                className="noGreenBg"
              />
            </div>
            <div className="text_area">
              <label
                for="password"
                style={{
                  color: password?.errorMessage ? "red" : "black",
                }}
              >
                Password
                <span className="inputError">
                  {password?.errorMessage ? ` - ${password?.errorMessage}` : ""}
                </span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={passwordOnChange}
                value={password?.value}
                style={{ minWidth: "380px" }}
                placeholder="Enter Password"
                className="noGreenBg"
              />
            </div>
            <button className="greenBgButton">Login</button>
          </form>
          <Link to="/signup" style={{ textDecoration: "underline" }}>
            Create New Account
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
