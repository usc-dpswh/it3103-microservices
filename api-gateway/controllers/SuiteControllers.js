export const GetBearerToken =
  ("/oauth2/suitecrm",
  async (request, response) => {
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
