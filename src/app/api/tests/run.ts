import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { runTests } from '@/lib/testRunner';
import { verifyToken } from '@/lib/auth';
import { RateLimiterMemory } from 'rate-limiter-flexible';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string; email: string };
}

const rateLimiter = new RateLimiterMemory({
  points: 5, // Number of requests
  duration: 60, // Per second
});

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await rateLimiter.consume(req.ip);
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = verifyToken(token);
    req.user = user;

    const { testConfig } = req.body;
    if (!testConfig) {
      return res.status(400).json({ message: 'No test configuration provided' });
    }

    await connectToDatabase();
    const results = await runTests(testConfig);

    return res.status(200).json({ results });
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
    return res.status(500).json({ message: String(err) });
  }
}