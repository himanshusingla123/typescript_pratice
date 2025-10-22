import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
// async function getManagementToken() {
//   const oktaDomain = process.env.OKTA_DOMAIN;
//   const clientId = process.env.CLIENT_ID;
//   const clientSecret = process.env.CLIENT_SECRET;
//   const url = `${oktaDomain}/oauth/token`;
//   const audience = `${oktaDomain}/api/v2/`;
//   //   console.log(oktaDomain + " " + clientId + " "+ clientSecret + " " + url )
//   const res = await axios.post(url, {
//     client_id: clientId,
//     client_secret: clientSecret,
//     audience: audience,
//     grant_type: "client_credentials",
//   });
//   return res.data.access_token;
// }

// async function listUsers() {
//   const token = await getManagementToken();
//   const users = await axios.get(`${process.env.OKTA_DOMAIN}/api/v1/users`, {
//     headers: { "authorization": `Bearer ${token}` },
//   });
//   console.log(users.data);
// }

// listUsers().catch(console.error);
