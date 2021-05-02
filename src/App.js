import { GoogleLogout } from 'react-google-login';

import GoogleLoginWrapper from 'components/shared/GoogleLoginWrapper/GoogleLoginWrapper';

import './App.css';

function App() {

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
        <GoogleLoginWrapper />
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
