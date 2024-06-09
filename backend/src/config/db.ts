import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async () => {
  try {
    //TODO find out best way to handle undefined env
    await mongoose.connect(process.env.MONGO_URI ?? "", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      //TODO find out why it's deprecated and what to do instead
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connect;
