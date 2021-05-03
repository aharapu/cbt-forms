import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';

import axios from 'axios';

const GoogleLoginWrapper = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {

  }, [])

  async function handleLoginSuccess(googleUser) {
    console.log('Login success!');

    const profile = googleUser.getBasicProfile();
    console.log('Email: ' + profile.getEmail());
    var idToken = googleUser.getAuthResponse().id_token;

    const { data } = await axios.post('/.netlify/functions/google-auth-login', { idToken });
    // function needs to check if user exists and return a user type 'admin' | 'therapist' | 'patient' | 'unset'
    // save the usertype to app state and redirect to the appropriate page
    // 'unset' sends you to a screen where you get to select 'therapist' OR 'patient' and save to DB, then redirect accordingly

    console.log(`data.userId`, data.userId);
    setInfo(data.payload);
  }

  function handleLoginFailure(error) {
    console.warn('Login failed!');
    console.log(error.details)
  }

  if (info) console.log(`info`, info);

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
      </div>
    </>
  );
};

export default GoogleLoginWrapper;

