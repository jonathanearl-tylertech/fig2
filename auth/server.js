const express = require('express');
const { Issuer, generators } = require('openid-client');
const session = require('express-session');
const { oidc } = require('./config.json');

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
        const tokenSet = await client.callback(oidc.redirect_uris, params, verify) // => Promise
        req.session.regenerate((err) => {
            if(err) return next(err);
            req.session.tokenSet = tokenSet;
            res.redirect('/');
        });
    } catch (err) {
        next(err);
    }
});

app.get('/auth/login', (req, res) => {
    req.session.oidc = { 
        code_verifier: generators.codeVerifier(),
        state: generators.state(),
        nonce: generators.nonce()
    };
    const url = client.authorizationUrl({
        scope: 'offline_access openid email profile',
        code_challenge: generators.codeChallenge(req.session.oidc.code_verifier),
        code_challenge_method: 'S256',
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
    const issuer = await Issuer.discover(oidc.discoverUrl);
    client = new issuer.Client({
        client_id: oidc.client_id,
        token_endpoint_auth_method: 'none',
        redirect_uris: [oidc.redirect_uris],
        response_types: ['code'],
        scope: 'openid email profile',
    });
    app.listen(PORT, () => console.log(`now listening on localhost:${PORT}`))
})();



