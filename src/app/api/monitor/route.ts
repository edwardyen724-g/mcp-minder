import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { verify } from 'jsonwebtoken';

interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    email: string;
  };
}

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const monitorHandler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  try {
    await connectToDatabase();
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    
    const decoded = verify(token, process.env.JWT_SECRET as string);
    req.user = { id: decoded.id, email: decoded.email };
    
    if (req.method === 'GET') {
      // Fetch monitoring data from database or external service here
      res.status(200).json({ message: 'Monitoring data fetched successfully' });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default monitorHandler;