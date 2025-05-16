import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "express-openid-connect";

const authConfig = {
  authRequired: false,
  baseURL: "http://localhost:8000",
  issuerBaseURL: "https://dev-ull70nfi0rcj3sv0.us.auth0.com",
  secret: "a long, randomly-generated string stored in env",
  clientID: "Kl67xSNyIxkjkfuFlKDMiy4nZywAc1ap",
  idpLogout: true,
  authRequired: false,
  routes: {
    login: false,
    postLogoutRedirect: "/custom-logout",
    callback: false,
  },
};

const app = express();
const port = 8000;
dotenv.config();

// cors
app.use(cors());

// middleware
app.use(express.json());
app.use(auth(authConfig));

app.listen(port, () => {
  console.log(`Server listing on port ${port}`);
});

export { app };
