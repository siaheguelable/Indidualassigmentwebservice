const mongoose = require('mongoose');
require('dotenv').config(); // to load MONGO_URI from .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected ✅');
  } catch (error) {
    console.error('MongoDB connection failed ❌', error);
    process.exit(1); // exit process with failure
  }
};

module.exports = connectDB;
