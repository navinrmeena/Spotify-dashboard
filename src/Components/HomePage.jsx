import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = ({ token, onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("Token is missing!");
        return;
      }

      try {
        // Fetch User Info
        const userResponse = await axios.get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(userResponse.data);

        // Fetch Top Tracks
        const tracksResponse = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks?limit=5",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTopTracks(tracksResponse.data.items || []);

        // Fetch User Playlists
        const playlistsResponse = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlaylists(playlistsResponse.data.items || []);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);

        // Handle 401 or 403 errors (invalid/expired token)
        if (error.response && [401, 403].includes(error.response.status)) {
          onLogout(); // Logout if token is invalid
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, onLogout]);

  const handleLogout = () => {
    onLogout(); // Clear token and redirect to login
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#121212",
        color: "#fff",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>🎧 Welcome to Spotify Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#1DB954",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {userData ? (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            {/* User Info */}
            <div
              style={{
                backgroundColor: "#282828",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <h2>👤 User Info</h2>
              <p>Name: {userData?.display_name || "N/A"}</p>
              <p>Email: {userData?.email || "N/A"}</p>
              <p>Country: {userData?.country || "N/A"}</p>
              <p>Followers: {userData?.followers?.total || 0}</p>
            </div>

            {/* Top Tracks */}
            <div
              style={{
                backgroundColor: "#282828",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <h2>🔥 Top Tracks</h2>
              {topTracks.length > 0 ? (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {topTracks.map((track, index) => (
                    <li
                      key={track.id}
                      onClick={() => {
                        if (track.album?.external_urls?.spotify) {
                          window.open(track.album.external_urls.spotify, "_blank");
                        }
                      }}
                      style={{
                        cursor: "pointer",
                        padding: "10px",
                        borderBottom: "1px solid #3e3e3e",
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#1e1e1e")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      {index + 1}. {track.name} by{" "}
                      {track.artists?.[0]?.name || "Unknown Artist"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No top tracks found.</p>
              )}
            </div>
          </div>

          {/* User Playlists */}
          <div
            style={{
              backgroundColor: "#282828",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h2>📚 Your Playlists</h2>
            {playlists.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "20px",
                }}
              >
                {playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    onClick={() => {
                      if (playlist.external_urls?.spotify) {
                        window.open(playlist.external_urls.spotify, "_blank");
                      }
                    }}
                    style={{
                      backgroundColor: "#1e1e1e",
                      padding: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <img
                      src={
                        playlist.images?.[0]?.url ||
                        "https://via.placeholder.com/150"
                      }
                      alt={playlist.name}
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        marginBottom: "10px",
                      }}
                    />
                    <h4>{playlist.name}</h4>
                    <p>{playlist.tracks?.total || 0} Tracks</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No playlists found.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Unable to load user data. Please try again.</p>
      )}
    </div>
  );
};

export default HomePage;
