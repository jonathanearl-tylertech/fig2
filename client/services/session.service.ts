import { GetServerSidePropsContext } from "next";

export const getCookies = (context: GetServerSidePropsContext) => {
  const uid = context.req.cookies['uid'];
  if (!uid)
    return null

  const cookies = context.req.headers.cookie;
  return cookies;
}