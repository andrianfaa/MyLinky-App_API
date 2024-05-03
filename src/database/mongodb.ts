import mongoose from "mongoose";

export default async (url: string) => {
  try {
    await mongoose.connect(url).then(() => {
      console.log("MongoDB connected");
    });
  } catch (error) {
    console.error(error);
  }
};
