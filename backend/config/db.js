import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://denis216051:mongobase@cluster0.klucn.mongodb.net/quizdb?retryWrites=true&w=majority&appName=Cluster0';

if (!MONGO_URI) {
  console.error("MongoDB connection error: MONGO_URI is not defined");
  process.exit(1);
}
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectToDatabase;
