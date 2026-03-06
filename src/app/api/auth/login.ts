import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { auth } from 'firebase-admin/auth';

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK as string);
initializeApp({
  credential: cert(serviceAccount)
});

interface AuthedRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

export default async function login(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, password } = req.body;

    const userRecord = await auth().getUserByEmail(email);
    
    // Further validation can be added here, if necessary

    const token = await getAuth().createCustomToken(userRecord.uid);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}