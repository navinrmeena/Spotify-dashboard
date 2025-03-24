// src/App.js
import React, { useEffect, useState } from "react";
import Login from "./Components/LoginButton";
import useAuth from "./hooks/useAuth";
import { useLocation } from "react-router-dom";

const loginpage = () => {
  const [code, setCode] = useState("");

  const getCodeFromUrl = () => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("code");
  };

  useEffect(() => {
    const codeFromUrl = getCodeFromUrl();
    if (codeFromUrl) {
      setCode(codeFromUrl);
    }
  }, []);

  const accessToken = useAuth(code);

  return (
    <div>
      {!accessToken ? (
        <Login />
      ) : (
        <div>
          <h2>Logged in!</h2>
          <p>Access Token: {accessToken}</p>
        </div>
      )}
    </div>
  );
};

export default loginpage;
