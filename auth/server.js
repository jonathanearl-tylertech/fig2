const express = require('express');
const { Issuer, generators } = require('openid-client');
const session = require('express-session');
require('dotenv').config()

let client;

const app = express();
app.enable('trust proxy');
app.use(session({ 
    secret: 'keyboard cat', 
    cookie: { httpOnly: true },
    saveUninitialized: false,
    resave: false
}));

app.get('/auth/callback', async (req, res, next) => {
    try {
        const params = client.callbackParams(req);
        const verify = req.session.oidc;
        console.log({params, verify})
        const tokenSet = await client.callback(`http://localhost:${PORT}/auth/callback`, params, verify) // => Promise
        console.log(tokenSet);
        req.session.regenerate((err) => {
            if(err) return next(err);
            req.session.tokenSet = tokenSet;
            res.redirect('/auth/user');
        });
    } catch (err) {
        next(err);
    }
});

app.get('/auth/login', (req, res) => {
    req.session.oidc = {
        state: generators.state(),
        nonce: generators.nonce()
    };
    const url = client.authorizationUrl({
        scope: 'openid email profile',
        ...req.session.oidc
    });
    res.redirect(url);
});

app.get('/auth/user', (req, res) => {
    res.json(req.session.tokenSet);
})

app.use((err, req, res, next) => {
    console.log(req.url, err);
    if (err) {
        res.status(500).send('opps something went wrong');
        return;
    }
    next();
});

const PORT = process.env.PORT || 8080;

(async () => {
    const issuer = await Issuer.discover(process.env.OIDC_DISCOVERYURL);
    client = new issuer.Client({
        client_id: process.env.OIDC_CLIENTID,
        client_secret: process.env.OIDC_CLIENTSECRET,
        redirect_uris: [`http://localhost:${PORT}/auth/callback`],
        response_types: ['code'],
        scope: 'openid email profile',
    });
    app.listen(PORT, () => console.log(`now listening on localhost:${PORT}`))
})();



