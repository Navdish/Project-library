const mongoose = require('mongoose');
require("dotenv").config();



(async ()=>  {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.ct3ioqh.mongodb.net/`)
        console.log("Database is connected");
    } catch (error) {
        console.log(error);
    }
  })();