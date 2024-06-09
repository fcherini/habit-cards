// services/auth.js
import * as AuthSession from "expo-auth-session";

// Your auth configuration
// const authConfig = {
//   clientId: "YOUR_CLIENT_ID",
//   redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
//   scopes: ["openid", "profile", "email"],
//   responseType: "token",
// };

// export async function signIn() {
//   const authUrl = `https://your-auth-server.com/auth?client_id=${
//     authConfig.clientId
//   }&redirect_uri=${authConfig.redirectUri}&response_type=${
//     authConfig.responseType
//   }&scope=${authConfig.scopes.join(" ")}`;
//   const result = await AuthSession.startAsync({ authUrl });

//   if (result.type === "success") {
//     return result.params;
//   } else {
//     throw new Error("Authentication failed");
//   }
// }
