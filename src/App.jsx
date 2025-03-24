import React, { useEffect, useState } from "react";
import { getAccessTokenFromUrl } from "./hooks/spotifyAuth";
import LoginButton from "./Components/LoginButton";
import HomePage from "./Components/HomePage";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  const [token, setToken] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("spotify_token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const accessToken = getAccessTokenFromUrl();
    if (accessToken) {
      setToken(accessToken);
      window.location.hash = "";
    }
    console.log("token", accessToken);
  }, []);

  return (
    <ErrorBoundary>
      <div>
        {!token ? (
          <LoginButton />
        ) : (
          <HomePage token={token} onLogout={handleLogout} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
