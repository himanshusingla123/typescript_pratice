import express from "express";
import pkg from "express-openid-connect";
import dotenv from "dotenv";

const { auth, requiresAuth } = pkg;
dotenv.config();
const app = express();
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "https://localhost:3001",
  clientID: `${process.env.CLIENT_ID}`,
  issuerBaseURL: `${process.env.OKTA_DOMAIN}`,
  secret: "LsNAcC3WNMVuBjXZZZzGzcsLA9Ag3HrS",
};

app.use(auth(config));

app.get('/', (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ? 'Logged in' : `${process.env.CLIENT_ID} ${process.env.OKTA_DOMAIN}`
  )
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.listen(3000, function () {
  console.log("Listening on http://localhost:3000");
});
