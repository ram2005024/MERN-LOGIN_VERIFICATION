import mongoose from "mongoose";
export const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database connection established");
  });
  await mongoose.connect(process.env.MONGOOSE_URL);
};
