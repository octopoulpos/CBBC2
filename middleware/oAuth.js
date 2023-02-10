var axios = require("axios");

const oAuth = (req, res, next) => {
    var code = req.query.code;
    console.log("oAuth middleware function triggered");

    if (!code) {
        res.status(401).send("Missing authorization code");
    }

    const CLIENT_ID = "b99082ce-2a5a-4a52-95bb-6d1093983ccc";
    const CLIENT_SECRET = "d3b594fc-3253-4ed6-b471-d709bb88b23c"
    const REDIRECT_URI = 'https://cb-bc.fr/cbbc-enedis';

    axios.post(`https://gw.hml.api.enedis.fr/v1/oauth2/token?redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&code=${code}`, {
        method: 'post',
        headers: {
            'Accept' : '*/*',
            'Accept-Encoding' : 'gzip, deflate, br',
            'Connection' : 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
           
        },
    })
        .then(response => {
            console.log(response.data);
            console.log(response.status);

            req.oauth = response.data;
            res.json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.json(error);
        })
}

module.exports = oAuth;