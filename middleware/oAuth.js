var axios = require("axios");
var qs = require('qs');

const oAuth = async (req, res, next) => {
    try {
        var code = req.query.code;
        console.log("oAuth middleware function triggered");

        if (!code) {
            res.status(401).send("Missing authorization code");
        }

        const CLIENT_ID = "b99082ce-2a5a-4a52-95bb-6d1093983ccc";
        const CLIENT_SECRET = "d3b594fc-3253-4ed6-b471-d709bb88b23c"
        const REDIRECT_URI = 'https://cb-bc.fr/cbbc-enedis';

        const data = qs.stringify({
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code
        });

        const response = await axios.post(`https://gw.hml.api.enedis.fr/v1/oauth2/token`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log(response.data);
        console.log(response.status);

        req.oauth = response.data;
        res.json(response.data);
    } catch (error) {
        console.log(error);
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send(error.message);
        }
    }

};

module.exports = oAuth;
