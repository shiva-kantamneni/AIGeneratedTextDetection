const mongoose=require("mongoose")
const mongoUrl=process.env.MONGO_CONN
const connectDB = async () => {
    try {
      await mongoose.connect(mongoUrl);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    }
  };
  connectDB();