import mongoose from "mongoose";

// Reuse one connection across hot reloads (dev) and warm serverless invocations (Netlify).
let cached = global._mongooseCache;
if (!cached) cached = global._mongooseCache = { conn: null, promise: null };

export function isDbConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export default async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 6000,
        maxPoolSize: 5,
        ...(process.env.MONGODB_DB ? { dbName: process.env.MONGODB_DB } : {}),
      })
      .catch((err) => {
        cached.promise = null; // allow a retry on the next request
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
