const mongoose = require("mongoose");

const connectDatabase = () => {
  console.log("Wait connecting to the database...");

  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Atlas Connected!"))
    .catch((err) => console.log(`Error connecting to MongoDB Atlas: ${err}`));
};

module.exports = connectDatabase;
