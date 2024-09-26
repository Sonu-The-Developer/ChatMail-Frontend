import React from "react";
import { message } from "antd";
import { Link } from "react-router-dom";
import "./Layout.css";
import { WechatOutlined } from "@ant-design/icons";

const UiLayout = ({ loggedID, setLoggedID }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const logoutUser = () => {
    messageApi.open({
      type: "success",
      content: "Log out successful",
    });

    setTimeout(() => {
      setLoggedID("");
      localStorage.setItem("loggedID", null);
      localStorage.setItem("user_email", null);
    }, 1000);
  };

  return (
    <>
      {contextHolder}
      {/* <>Ui Layout</> */}
      <div
        id="navbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <div
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
            className="greenBgButton"
          >
            <WechatOutlined id="logo" style={{ fontSize: "14px" }} />
            <span id="logoText">ChatMail</span>
          </div>
        </Link>

        <div id="navbarRoutes">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "100px",
            }}
            className="noGreenBg"
          >
            {!loggedID ? (
              <>
                <Link to="/login">
                  <h4 className="headerRouteText">Login</h4>
                </Link>
                <Link to="/signup">
                  <h4 className="headerRouteText">Signup</h4>
                </Link>
              </>
            ) : (
              <>
                <h4 className="headerRouteText">Add New Email</h4>
                <h4 className="headerRouteText" onClick={logoutUser}>
                  Logout
                </h4>
              </>
            )}
            <Link to="/about">
              <h4 className="headerRouteText">About Us</h4>
            </Link>
          </div>
        </div>

        <div id="navbarButton">
          {!loggedID ? (
            <Link to="/signup">
              <button className="greenBgButton">Create Account</button>
            </Link>
          ) : (
            <button className="greenBgButton">My Profile</button>
          )}
        </div>
      </div>
    </>
  );
};

export default UiLayout;
