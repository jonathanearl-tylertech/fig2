export interface UserSession {
  code: string,
  response_type: string,
  scope: string[],
  client_id: string,
  state: string,
  redirect_uri: string,
  nonce: string;
  uid: string;
}