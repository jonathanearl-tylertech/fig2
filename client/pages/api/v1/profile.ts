import type { NextApiRequest, NextApiResponse } from 'next';
import { getUidFromCookie } from '../../../services/cookie.service';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const uid = getUidFromCookie(req, res);
}