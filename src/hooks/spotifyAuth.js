const clientId = "c491fb554ee0439e91970a30f9e3e970";
const redirectUri = "http://localhost:3000/callback";
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
