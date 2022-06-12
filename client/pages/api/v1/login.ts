import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  console.log(req.body)
  const response = await fetch('http://localhost:5000/api/v1/session', { method: 'POST', body: JSON.stringify(req.body) });
  console.log(response);
  res.send(req.body);
}