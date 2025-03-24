const clientId = import.meta.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "playlist-read-private",
  "user-library-read",
].join(" ");

export const getSpotifyAuthUrl = () => {
  return `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
    scopes
  )}&response_type=token&show_dialog=true`;
};

export const getAccessTokenFromUrl = () => {
  const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      const [key, value] = item.split("=");
      initial[key] = decodeURIComponent(value);
      return initial;
    }, {});

  return hash.access_token;
};
