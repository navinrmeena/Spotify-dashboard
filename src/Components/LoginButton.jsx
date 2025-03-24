import React from "react";
import { getSpotifyAuthUrl } from "../hooks/spotifyAuth";

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%", // Full width
        backgroundColor: "#121212",
      }}
    >
      <div
        style={{
          textAlign: "center",
          width: "100%", // Full width content
          maxWidth: "100%", // To avoid overflow
          padding: "20px",
          backgroundColor: "#282828",
        }}
      >
        <h1 style={{ color: "#1DB954", marginBottom: "20px" }}>
          Welcome to Spotify App
        </h1>
        <button
          onClick={handleLogin}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            backgroundColor: "#1DB954",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login with Spotify
        </button>
      </div>
    </div>
  );
};

export default LoginButton;
