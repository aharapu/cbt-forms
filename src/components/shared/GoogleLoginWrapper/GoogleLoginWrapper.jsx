import { useState } from 'react';
import GoogleLogin from 'react-google-login';

const GoogleLoginWrapper = () => {
  const [info, setInfo] = useState(null);

  async function handleLoginSuccess(googleUser) {
    console.log('login success');

    const profile = googleUser.getBasicProfile();
    console.log('Email: ' + profile.getEmail());
    var idToken = googleUser.getAuthResponse().id_token;
    console.log(`idToken`, idToken);

    // send request to backend (include token)

    // save response in info
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

