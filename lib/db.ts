import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
   throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

interface MongooseCache {
   conn: Mongoose | null;
   promise: Promise<Mongoose> | null;
}

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
   cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
   if (cached.conn) {
      return cached.conn;
   }

   if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
         return mongoose;
      });
   }
   cached.conn = await cached.promise;
   return cached.conn;
}

export default dbConnect;
