import { GetServerSidePropsContext } from "next";
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from "http";

export const COOKIE_NAME = 'uid';

export const getUidFromCookie = (req: IncomingMessage, res: ServerResponse) => {
  const cookies = Cookies(req, res);
  const secret = process.env.cookie_secret;
  if (!secret)
    throw new UidMisconfiguredSecretError();

  const uidCookie = cookies.get(COOKIE_NAME);
  if (!uidCookie) {
    cookies.set(COOKIE_NAME, null);
    throw new UidNotFoundError();
  }

  let payload: any;
  try {
    payload = jwt.verify(uidCookie as string, secret, { algorithms: ['HS256'] });
  }
  catch (err) {
    cookies.set(COOKIE_NAME, null);
    throw new UidCannotBeParsedError();
  }

  const { uid } = payload as jwt.JwtPayload;
  if (!uid)
  {
    cookies.set(COOKIE_NAME, null);
    throw new UidNotFoundError();
  }

  return uid;
}

export class UidNotFoundError extends Error {
  message: string = `${COOKIE_NAME} not found`;
}

export class UidMisconfiguredSecretError extends Error {
  message: string = 'env_var:cookie_secret not found, set the env variable';
}

export class UidCannotBeParsedError extends Error {
  message: string = `${COOKIE_NAME} cannot be parsed, did the secret change?`
}