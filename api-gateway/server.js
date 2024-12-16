// Load environment variables from .env file
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import axios from "axios";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies if needed

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: `Welcome to the API Gateway of Dreams! Port ${PORT}!` });
});

// Endpoint to handle OAuth2 requests
app.post("/oauth2/suitecrm", async (req, res) => {
  const clientID = "d7f511bb-3986-576c-84dc-67602d83993d";
  const clientSecret = "achille";

  // Create URLSearchParams for application/x-www-form-urlencoded
  const qs = new URLSearchParams();
  qs.set("grant_type", "client_credentials");
  qs.set("client_id", clientID);
  qs.set("client_secret", clientSecret);

  try {
    // Make the POST request with correct parameters
    const response = await axios.post(
      "http://localhost:8000/legacy/Api/access_token", // Correct API endpoint
      qs.toString(), // Pass the URL-encoded string as the body
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Set content type
        },
      }
    );

    res.json(response.data); // Send the response data back to the client
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error fetching data");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
