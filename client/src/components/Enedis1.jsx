import React from 'react';

import axios from 'axios';

// require('dotenv').config();
// console.log(process.env.REACT_APP_API_ID)

const CLIENT_ID = process.env.REACT_APP_API_ID;
// const DURATION = '7'; // duration is the duration of the consent that you want (1, 7, 15 or 30 days)
const REDIRECT_URI = 'https://cb-bc.fr/cbbc-enedis';



const LoginButton = () => {
  const handleLogin = () => {
    // Generate state parameter with random string
    // let state = (Math.random() + 1).toString(36).substring(7);

    // // Add test client number (from 0 to 4) to the end of state (cf documentation)
    // const testClientId = 0; // Replace with the test client number you want to use
    // state = state + testClientId;

    // Redirect user to login page on Enedis

    // code origine : (chatgpt+doc enedis?)
    //   const redirectUrl =
    //     'https://gw.hml.api.enedis.fr/group/espace-particuliers/consentement-linky/oauth2/authorize' +
    //     '?' +
    //     `client_id=${CLIENT_ID}` +
    //     `&state=${state}` +
    //     `&duration=${DURATION}` +
    //     '&response_type=code' +
    //     `&redirect_uri=${REDIRECT_URI}`;
    //   window.location.replace(redirectUrl);
    // };
    // !!test!! bac à cable : 
    const redirectUrl =
      'https://gw.hml.api.enedis.fr/v1/oauth2/authorize' +
      '?' +
      `client_id=${CLIENT_ID}` +
      '&response_type=code' +
      `&redirect_uri=${REDIRECT_URI}` +
      `&user_type={both}`;
    window.location.replace(redirectUrl);
  };
  return (

<img
      src={require("./boutonEne-txtnoir.png")}
      alt="Connection au portail Enedis"
      onClick={handleLogin}
      style={{ cursor: 'pointer', maxWidth: '250px' }}
    />

  );
};

const Callback = () => {
  React.useEffect(() => {
    // Check if state parameter matches the one stored in session
    const storedState = sessionStorage.getItem('state');
    if (storedState !== window.location.search.substring(6)) {
      console.error('Error: state does not match');
      return;
    }

    // Exchange authorization code for access and refresh tokens
    axios.post('https://gw.hml.api.enedis.fr/group/espace-particuliers/consentement-linky/oauth2/token', {
      grant_type: 'authorization_code',
      code: window.location.search.substring(6),
      client_id: CLIENT_ID,
      client_secret: 'PRM:11453290002823',
      redirect_uri: REDIRECT_URI
    })
      .then(response => {
        console.log(response.data);
        // Store access and refresh tokens in session
        sessionStorage.setItem('access_token', response.data.access_token);
        sessionStorage.setItem('refresh_token', response.data.refresh_token);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      Loading...
    </div>
  );
};


const AppEne = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
  };

  let content;
  if (isLoggedIn) {
    content = (
      <div>
        <button onClick={handleLogout}>Logout</button>
        {/* Render protected content here */}
      </div>
    );
  } else if (window.location.pathname === '/callback') {
    content = <Callback />;
  } else {
    content = <LoginButton setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div>
      {content}
    </div>
  );
};


export default LoginButton;
export { LoginButton, AppEne }
