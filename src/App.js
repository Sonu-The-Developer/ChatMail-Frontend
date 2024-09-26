import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// !
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import About from "./components/About/About";
import UiLayout from "./components/Layout/Layout";
import Home_Chat_Page from "./components/Home_Chat_Page/Home_Chat_Page";

// import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const loggedIDValue = localStorage?.getItem("loggedID");
  const [loggedID, setLoggedID] = useState(loggedIDValue);

  console.log("Data:", loggedID);

  return (
    <Router>
      <div className="App" style={{ background: "#FCF5EB" }}>
        <UiLayout loggedID={loggedID} setLoggedID={setLoggedID} />
        <Routes>
          {/* Public Routes */}
          {!loggedID ? (
            <>
              <Route
                path="/login"
                element={
                  <Login loggedID={loggedID} setLoggedID={setLoggedID} />
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </>
          ) : (
            <Route element={<ProtectedRoute loggedID={loggedID} />}>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/register" element={<Navigate to="/" />} />
              <Route path="/" element={<Home_Chat_Page />} />
              {/* {isAdmin ? (
                  <>
                    <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                    <Route path="/admin-dashboard" element={<AdminHome />} />
                    <Route path="/userDetails" element={<Navigate to="/" />} />
                    <Route path="/products" element={<Navigate to="/" />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Navigate to="/userDetails" />} />
                    <Route path="/userDetails" element={<UserDetails />} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/admin-dashboard" element={<Navigate to="/" />} />
                  </>
                )} */}
            </Route>
          )}

          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
