import React, { useState, useEffect } from 'react';

// const CLIENT_ID /////// Installer react-dotenv.....REACT_APP_API_ID+++
const CLIENT_ID = "b99082ce-2a5a-4a52-95bb-6d1093983ccc";
// const DURATION = '7'; // duration is the duration of the consent that you want (1, 7, 15 or 30 days)
const REDIRECT_URI = 'https://cb-bc.fr/cbbc-enedis';



const LoginButton = () => {
  const handleLogin = () => {
    // Generate state parameter with random string
    let state = (Math.random() + 1).toString(36).substring(7);

    // // Add test client number (from 0 to 4) to the end of state (cf documentation)
    const testClientId = 0; // Replace with the test client number you want to use
    state = state + testClientId;
    console.log(state);

    // Redirect user to login page on Enedis

    const redirectUrl =
      'https://gw.hml.api.enedis.fr/v1/oauth2/authorize' +
      '?' +
      `client_id=${CLIENT_ID}` +
      '&response_type=code' +
      `&redirect_uri=${REDIRECT_URI}` +
      `&user_type=both`;
    window.location.replace(redirectUrl);
  };
  return (

    <img
      src={require("../static/boutonEne-txtnoir.png")}
      alt="Connection au portail Enedis"
      onClick={handleLogin}
      style={{ cursor: 'pointer', maxWidth: '250px' }}
    />

  );
};

const Callback = () => {
  const code = window.location.search.substring(6);
  const [callbackData, setCallbackData] = useState("Loading...");

  useEffect(() => {
    fetch(`http://localhost:5000/auth?code=${code}`, {
      method: 'POST',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(res => setCallbackData(JSON.stringify(res)))
      .catch(error => setCallbackData(`An error occurred: ${error.message}`));
  }, [code]);

  console.log(code + " from Enedis1 Callback");
  return (
    <div>
      <h2> {callbackData} </h2>
    </div>
  );
};


export default LoginButton;
export { LoginButton, Callback }



