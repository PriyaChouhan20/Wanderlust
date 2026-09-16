const mongoose = require("mongoose");
const initData = require("./data.js");
const dns = require("dns");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const Listing = require("../models/listing.js");
const User = require("../models/user.js");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
    return initDB();
  })
  .then(() => {
    console.log("Data initialization completed.");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Database Error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  // Find or create a default demo user to be the owner of sample listings
  let user = await User.findOne({ username: "demouser" });
  if (!user) {
    const newUser = new User({
      email: "demo@gmail.com",
      username: "demouser",
    });
    user = await User.register(newUser, "demopassword");
  }

  const sampleListings = initData.data.map((obj) => ({
    ...obj,
    owner: user._id,
  }));

  await Listing.insertMany(sampleListings);
  console.log("Sample listings were initialized with owner:", user.username);
};