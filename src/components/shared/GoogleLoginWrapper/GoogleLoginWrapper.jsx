import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';

import axios from 'axios';

const GoogleLoginWrapper = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    console.log(`process.env.GOOGLE_CLIENT_ID`, process.env.REACT_APP_GOOGLE_CLIENT_ID);
    console.log(`process.env.TEST`, process.env.TEST);
    console.log(`process.env.REACT_APP_TEST`, process.env.REACT_APP_TEST);

    authTesting();
  }, [])

  async function authTesting() {
    const { data } = await axios.post('/.netlify/functions/google-auth-login', { idToken: '1234' });
    setInfo(data.message);
    console.log(`data.idToken`, data.idToken);
  }

  async function handleLoginSuccess(googleUser) {
    console.log('login success');

    const profile = googleUser.getBasicProfile();
    console.log('Email: ' + profile.getEmail());
    var idToken = googleUser.getAuthResponse().id_token;
    console.log(`idToken`, idToken);

    const { data } = await axios.post('/.netlify/functions/google-auth-login', { idToken });

    setInfo(data.message);
    console.log(`data.idToken`, data.idToken);
  }

  function handleLoginFailure(error) {
    console.log('login failed');
    console.log(`error`, error);
    console.log(error.details)
  }

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
      />
      <div>
        <h6>server response</h6>
        <p>{info}</p>
      </div>
    </>
  );
};

export default GoogleLoginWrapper;

