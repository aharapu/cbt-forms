import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';

import axios from 'axios';

const GoogleLoginWrapper = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
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
        clientId="960101545622-6b9nlu0b08d1qsvjitv7cv7lhoilodfo.apps.googleusercontent.com"
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

