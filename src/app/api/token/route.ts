import connect from '@/connection/db.config';
import Token from '@/models/tokenModel';
import { NextApiRequest, NextApiResponse } from 'next';

connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, symbol, decimal, supply } = req.body;

      console.log(req.body);

      // Validate required fields
      if (!name || !symbol || !decimal || !supply) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Check if token already exists
      const token = await Token.findOne({ symbol });

      if (token) {
        return res.status(400).json({ error: 'Token already exists!' });
      }

      const newToken = new Token({ name, symbol, decimal, supply });

      const savedToken = await newToken.save();
      console.log(savedToken);

      return res.status(201).json({ message: 'Token created successfully!', success: true, savedToken });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
