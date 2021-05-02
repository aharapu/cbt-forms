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
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogoutSuccess}
          onFailure={handleLogoutFailure}
        />
      </header>
    </div>
  );
}

export default App;
