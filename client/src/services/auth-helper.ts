import crypto from 'crypto';

// okta specific due to special implicit flow
class AuthenticationHelper {
  private state: string = '';
  private nonce: string = '';
  private accessToken: string = '';
  private idToken: string = '';
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
    const token = await this.renewTokens(sessionToken);
    this.accessToken = token;
    return token;
  }

  async logout() {
    const url = new URL(`${this.oktaOrgUrl}/login/signout`)
    url.searchParams.append('id_token_hint', this.idToken);
    url.searchParams.append('post_logout_redirect_uri', 'http://localhost:3000');
    const iframe = this.getIframe();
    iframe.src = url.toString();
  }

  async getToken() {
    let token = this.accessToken;

    if (!token || !this.validateToken(token))
      token = await this.renewTokens();

    if (!token || !this.validateToken(token))
      return '';

    this.accessToken = token;
    return token;
  }

  validateToken(token: string) {
    try {
      const encodedData = token.split('.')[1];
      const data = atob(encodedData) as any;
      const userClaims = JSON.parse(data);
      console.log(userClaims);
      const now = Date.now().valueOf() / 1000;
      const exp = userClaims['exp'] as number;
      return exp > now;
    } catch (err) {
      console.warn('could not validate token', err);
      return false;
    }
  }

  renewTokens(sessionToken?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // set token when passed by okta
      const setTokenFunction = (event: any) => {
        window.removeEventListener("message", setTokenFunction);
        const token = event.data?.access_token;
        this.idToken = event.data?.id_token;
        this.accessToken = event.data?.access_token;
        resolve(token);
      };

      try {
        // listen for tokens
        window.addEventListener("message", setTokenFunction, false);

        // set timeout
        setTimeout(() => {
          window.removeEventListener("message", setTokenFunction);
          reject('');
        }, 10000);

        // request token in iframe
        var state = crypto.randomBytes(64).toString('hex');
        var nonce = crypto.randomBytes(64).toString('hex');
        const url = new URL(`${this.oktaOrgUrl}/oauth2/default/v1/authorize`)
        url.searchParams.append('client_id', '0oa1mxsdbeeTtGz8S4x7');
        url.searchParams.append('response_type', 'id_token token')
        url.searchParams.append('response_mode', 'okta_post_message');
        url.searchParams.append('scope', 'openid profile groups');
        url.searchParams.append('redirect_uri', 'http://localhost:3000');
        url.searchParams.append('prompt', 'none');
        url.searchParams.append('state', state);
        url.searchParams.append('nonce', nonce);

        if (sessionToken) {
          url.searchParams.append('sessionToken', sessionToken);
        }

        this.iframe.src = url.toString();
      } catch (err) {
        console.log('iframe error?', err);
        window.removeEventListener("message", setTokenFunction);
        reject('');
      }
    });
  }

  render() {
    return null;
  }
}

export const AuthHelper = new AuthenticationHelper();