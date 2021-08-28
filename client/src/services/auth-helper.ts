import crypto from 'crypto';

// okta specific due to special implicit flow
class AuthenticationHelper {
  private access_token: string = '';
  private accessExpires: number = 0;
  private id_token: string = '';
  private state: string = '';
  private nonce: string = '';
  private sessionToken: string = '';
  private iframe: HTMLIFrameElement;
  private oktaOrgUrl: string;

  constructor() {
    this.iframe = this.getIframe();
    this.oktaOrgUrl = process.env.REACT_APP_OKTA_ORG_URL as string;
  }

  private getIframe() {
    let iframe = document.getElementById('oauthMessager') as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'oauthMessager'
      document.body.appendChild(iframe);
    }
    return iframe;
  }

  async login(username: string, password: string) {
    const body = {
      username,
      password,
      "options": {
        "multiOptionalFactorEnroll": false,
        "warnBeforePasswordExpired": false
      },
    };

    // fetch sessionToken
    const requestInit: RequestInit = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(body),
    }
    const res = await fetch(`${this.oktaOrgUrl}/api/v1/authn`, requestInit)
    const data = await res.json();
    const { sessionToken, status } = data;

    if (status !== 'SUCCESS') {
      throw new Error(`unable to login ${status}`);
    }

    this.sessionToken = sessionToken;
    await this.renewTokens();
  }

  async getToken() {
    if (!this.access_token)
      await this.renewTokens();
    
    const isValid = this.validateToken(this.access_token);
    console.log({isValid})
    if (!isValid)
      await this.renewTokens();

    return this.access_token;
  }

  validateToken(token: string) {
    try {
      const data = token.split('.')[1];
      const userClaims = atob(data) as any;
      console.log(userClaims)
      const now = Date.now().valueOf() / 1000
      const exp = userClaims['exp'] as number;
      return now > exp;
    } catch (err) {
      console.warn('could not validate token', err);
      return false;
    }

  }

  renewTokens() {
    return new Promise((resolve, reject) => {
      // set token when passed by okta
      const setTokenFunction = (event: any) => {
        window.removeEventListener("message", setTokenFunction);
        console.log(event);
        this.id_token = event.data?.id_token;
        this.access_token = event.data?.access_token;
        this.validateToken(this.access_token);
        resolve(true);
      };

      try {
        // listen for tokens
        window.addEventListener("message", setTokenFunction, false);

        // set timeout
        setTimeout(() => {
          window.removeEventListener("message", setTokenFunction);
          reject(false);
        }, 10000);

        // request token in iframe
        var state = crypto.randomBytes(64).toString('hex');
        var nonce = crypto.randomBytes(64).toString('hex');
        const url = new URL(`${this.oktaOrgUrl}/oauth2/default/v1/authorize`)
        url.searchParams.append('client_id', '0oa1mxsdbeeTtGz8S4x7');
        url.searchParams.append('response_type', 'token')
        url.searchParams.append('response_mode', 'okta_post_message');
        url.searchParams.append('scope', 'openid profile groups');
        url.searchParams.append('redirect_uri', 'http://localhost:3000');
        url.searchParams.append('prompt', 'none');
        url.searchParams.append('state', state);
        url.searchParams.append('nonce', nonce);

        if (this.sessionToken) {
          url.searchParams.append('sessionToken', this.sessionToken);
        }

        this.iframe.src = url.toString();
      } catch (err) {
        console.log('iframe error?', err);
        window.removeEventListener("message", setTokenFunction);
        reject(false);
      }
    });
  }
}

export const AuthHelper = new AuthenticationHelper();