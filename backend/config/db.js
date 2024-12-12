import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Add recommended options for the connection
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connected to MongoDB: ${conn.connection.host} 👍`);
  } catch (error) {
    // Corrected the typo and added stack trace for better debugging
    console.error(`Database Connection Error: ${error.message}`);
    console.error(error.stack);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectDB;
