import { GoogleLogin, GoogleLogout } from 'react-google-login';

import './App.css';

function App() {

  function handleLoginSuccess(googleUser) {
    console.log('login success');

    const profile = googleUser.getBasicProfile();
    console.log('Email: ' + profile.getEmail());
  }

  function handleLoginFailure(error) {
    console.log('login failed');
    console.log(`error`, error);
    console.log(error.details)
  }

  function handleLogoutSuccess(response) {
    console.log('logout success');
    console.log(`response`, response);
  }

  function handleLogoutFailure(response) {
    console.log('logout failure');
    console.log(`response`, response);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          CBT-app.
        </p>
        <GoogleLogin
          clientId="960101545622-6b9nlu0b08d1qsvjitv7cv7lhoilodfo.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          // cookiePolicy={'single_host_origin'}
          // isSignedIn={false}
        />
        <GoogleLogout
          clientId="960101545622-6b9nlu0b08d1qsvjitv7cv7lhoilodfo.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={handleLogoutSuccess}
          onFailure={handleLogoutFailure}
        />
      </header>
    </div>
  );
}

export default App;
