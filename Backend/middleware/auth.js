const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const request = require("request");

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userEmail = payload["email"];
  return userEmail;
}

function authMiddleware(request, response, next) {
  const clientToken = request.headers.authorization;
  if (!clientToken) {
    return response.send({ message: "No token provided" }).status(401);
  }

  verify(clientToken)
    .then((userEmail) => {
      request.user = { email: userEmail };
      next();
    })
    .catch((err) => {
      console.error(err);
      return response.send({ message: "Authorization failed" }).status(403);
    });
}

module.exports = authMiddleware;
