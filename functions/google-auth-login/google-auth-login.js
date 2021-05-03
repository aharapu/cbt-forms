// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const { idToken } = JSON.parse(event.body);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: `Buna ziua!`, 
        idToken,
        envGoogleId: process.env.REACT_APP_GOOGLE_CLIENT_ID
      }),  
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
