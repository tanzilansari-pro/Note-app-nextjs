import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env")
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI)
      .then((mongoose) => {
        console.log("Database connected")
        return mongoose
      })
      .catch((err) => {
        console.error("DB connection error:", err)
        throw err
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}
