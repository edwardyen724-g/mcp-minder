import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; // Assume you have a MongoDB connection utility
import { AuditLog } from '@/models/AuditLog'; // Assume you have a Mongoose model for AuditLog

interface AuthedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export async function GET(req: AuthedRequest) {
  try {
    await connectToDatabase(); // Connect to MongoDB

    const logs = await AuditLog.find({ userId: req.user?.id }) // query logs for the authenticated user
      .sort({ createdAt: -1 }) // Sort by the most recent first
      .exec();

    return NextResponse.json(logs);
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500 }
    );
  }
}