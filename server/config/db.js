const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("DB_URL not defined in environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const setDB_Connection = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(DB_URL, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    });
  }

  cached.conn = await cached.promise;
  console.log("Database Connected");
  return cached.conn;
};

module.exports = setDB_Connection;
