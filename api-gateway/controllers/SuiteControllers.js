// SuiteControllers.js

import axios from "axios";

export const GetBearerToken =
  ("/oauth2/suitecrm",
  async (req, res) => {
    const clientID = "d7f511bb-3986-576c-84dc-67602d83993d";
    const clientSecret = "achille";

    const qs = new URLSearchParams();
    qs.set("grant_type", "client_credentials");
    qs.set("client_id", clientID);
    qs.set("client_secret", clientSecret);

    try {
      const response = await axios.post(
        "http://localhost:8000/legacy/Api/access_token",
        qs.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      res.json(response.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
      res.status(500).send("Error fetching data");
    }
  });
