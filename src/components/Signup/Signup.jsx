import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { message } from "antd";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [userName, setUserName] = useState({ value: "", errorMessage: "" });
  const [emailId, setEmailId] = useState({ value: "", errorMessage: "" });
  const [password, setPassword] = useState({ value: "", errorMessage: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    errorMessage: "",
  });

  const userNameOnChange = (e) => {
    setUserName({
      value: e?.target?.value,
      errorMessage: e?.target?.value ? "" : "Required Field!",
    });
  };

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

    if (confirmPassword?.value !== e?.target?.value) {
      setConfirmPassword({
        value: confirmPassword?.value,
        errorMessage: "Passwords Mismatch!",
      });
    } else {
      // password changed and matched

      // will check both empty or not
      setConfirmPassword({
        value: confirmPassword?.value,
        errorMessage: e?.target?.value ? "" : "Required Field!",
      });
    }
  };

  const confirmPasswordOnChange = (e) => {
    setConfirmPassword({
      value: e?.target?.value,
      errorMessage: e?.target?.value ? "" : "Required Field!",
    });

    if (password?.value !== e?.target?.value && e?.target?.value) {
      setConfirmPassword({
        value: e?.target?.value,
        errorMessage: "Passwords Mismatch!",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName?.value) {
      setUserName({ value: "", errorMessage: "Required Field!" });
    }
    if (!emailId?.value) {
      setEmailId({ value: "", errorMessage: "Required Field!" });
    }
    if (!password?.value) {
      setPassword({ value: "", errorMessage: "Required Field!" });
    }
    if (!confirmPassword?.value) {
      setConfirmPassword({ value: "", errorMessage: "Required Field!" });
    }

    if (
      !userName?.value ||
      !emailId?.value ||
      !password?.value ||
      !confirmPassword?.value
    ) {
      messageApi.open({
        type: "error",
        content: "Found an empty field or invalid input",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password?.value, salt);

      try {
        const response = await axios.post("http://localhost:5000/newUser", {
          user_name: userName,
          email_id: emailId,
          password: hashedPassword,
        });

        if (response?.data?.ok) {
          setUserName({ value: "", errorMessage: "" });
          setEmailId({ value: "", errorMessage: "" });
          setPassword({ value: "", errorMessage: "" });
          setConfirmPassword({ value: "", errorMessage: "" });

          messageApi.open({
            type: "success",
            content: response?.data?.message,
          });

          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      } catch (error) {
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
      <div id="signCard">
        <div id="sign" style={{ textAlign: "center" }}>
          <h2>
            Begin Journey With <spna id="chatmailName">Chatmail</spna>
          </h2>
          <form onSubmit={handleSubmit} id="signForm">
            <div className="text_area">
              <label
                for="user_name"
                style={{
                  color: userName?.errorMessage ? "red" : "black",
                }}
              >
                Full Name
                <span className="inputError">
                  {userName?.errorMessage ? ` - ${userName?.errorMessage}` : ""}
                </span>
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                onChange={userNameOnChange}
                value={userName?.value}
                style={{ minWidth: "380px" }}
                placeholder="Enter Your Full Name"
                className="noGreenBg"
              />
            </div>
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
                placeholder="Enter A Strong Password"
                className="noGreenBg"
              />
            </div>
            <div className="text_area">
              <label
                for="confirm_password"
                style={{
                  color: confirmPassword?.errorMessage ? "red" : "black",
                }}
              >
                Confirm Password
                <span className="inputError">
                  {confirmPassword?.errorMessage
                    ? ` - ${confirmPassword?.errorMessage}`
                    : ""}
                </span>
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                onChange={confirmPasswordOnChange}
                value={confirmPassword?.value}
                style={{ minWidth: "380px" }}
                placeholder="Confirm Your Password"
                className="noGreenBg"
              />
            </div>
            <button className="greenBgButton">Signup</button>
          </form>
          <Link to="/login" style={{ textDecoration: "underline" }}>
            Want To Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
