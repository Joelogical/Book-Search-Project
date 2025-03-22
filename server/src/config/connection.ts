import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/googlebooks";

console.log("Attempting to connect to MongoDB...");

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 30000,
    retryWrites: true,
    dbName: "googlebooks",
    authSource: "admin",
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
    },
  })
  .then(() => {
    console.log("🗄️  MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("\n=== MongoDB Connection Error ===");
    console.error(
      `Connection string used: ${MONGODB_URI.replace(/:[^:]*@/, ":****@")}`
    );
    console.error(`Error Type: ${err.name}`);
    console.error(`Error Code: ${err.code}`);
    console.error(`Error Message: ${err.message}`);

    if (err.code === 18) {
      console.log(
        "\nAuthentication Error Detected. Please verify in MongoDB Atlas:"
      );
      console.log("1. Go to 'Database Access'");
      console.log("2. Find user 'jmsmithcoding'");
      console.log("3. Click 'Edit'");
      console.log("4. Check that Authentication Method is 'Password'");
      console.log(
        "5. Verify the user has appropriate permissions (e.g., 'Atlas admin' or 'readWrite')"
      );
      console.log(
        "6. Consider resetting the password and updating the .env file"
      );
      console.log("\nAlternative solution:");
      console.log("1. Create a new database user with a new password");
      console.log("2. Make sure to give it 'Atlas admin' role");
      console.log("3. Update the .env file with the new credentials");
    }

    throw err;
  });

export default mongoose.connection;
