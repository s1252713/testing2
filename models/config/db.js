const mongoose = require('mongoose');
const connectDB = async()=> {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect("mongodb+srv://project1:Asjh04180834@cluster0.jdci1tl.mongodb.net/testn");
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;

