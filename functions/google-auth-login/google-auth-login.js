const {OAuth2Client} = require('google-auth-library');

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const { idToken } = JSON.parse(event.body);
    
    const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const userId = payload['sub'];

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        userId,
        payload,
      }),  
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
