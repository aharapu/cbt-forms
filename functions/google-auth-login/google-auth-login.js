const {OAuth2Client} = require('google-auth-library');
const { MongoClient } = require("mongodb");

const googleClient = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const mongoClient = new MongoClient(process.env.MONGODB_URL, { useUnifiedTopology: true });

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const { idToken } = JSON.parse(event.body);
    
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const userId = payload['sub'];

    await mongoClient.connect();
    const db = mongoClient.db('cbt-forms-app');
    const collection = db.collection('cbt-forms-users');
    const doc = { name: payload.name, email: payload.email };

    const result = await collection.insertOne(doc);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        userId,
        payload,
        result,
      }),  
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  } finally {
    await mongoClient.close();
  }
}

module.exports = { handler }
