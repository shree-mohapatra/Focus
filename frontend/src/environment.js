let IS_PROD = true;

const server = IS_PROD
  ? "https://focusbackend-3n3u.onrender.com"
  : "http://localhost:8000";

export default server;
