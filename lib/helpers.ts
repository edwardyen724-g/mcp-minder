import axios from 'axios';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

export const connectToDatabase = async (dbUri: string): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    throw new Error(`Database connection error: ${err instanceof Error ? err.message : String(err)}`);
  }
};

export const fetchMCPData = async (url: string, authToken: string): Promise<any> => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(`Failed to fetch MCP data: ${err instanceof Error ? err.message : String(err)}`);
  }
};

export const verifyToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (err) {
    throw new Error(`Token verification error: ${err instanceof Error ? err.message : String(err)}`);
  }
};