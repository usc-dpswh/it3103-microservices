// SuiteControllers.js

import axios from "axios";
import * as Config from "../config/constants.js";

export const getBearerToken = async (req, res) => {
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
};

export const getAllUsers = async (req, res) => {
  try {
    const response = await axios.get(`${Config.CRM_URL}/module/Accounts`, {
      headers: {
        Authorization: `Bearer ${Config.CRM_API_KEY}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error fetching data");
  }
};

export const getUserById = async (req, res) => {
  const userid = req.query.userid;

  if (!userid || userid.trim() === "") {
    console.error("Passed query parameter 'id' is not a valid value.");
    return res
      .status(400)
      .send("Error: 'id' query parameter is required and cannot be empty.");
  }

  try {
    const response = await axios.get(
      `${Config.CRM_URL}/module/Accounts/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${Config.CRM_API_KEY}`,
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
};

export const getUsersByName = async (req, res) => {
  const user = req.query.user;

  if (!user || user.trim() === "") {
    console.error("Passed query parameter 'user' is not a valid value.");
    return res
      .status(400)
      .send("Error: 'user' query parameter is required and cannot be empty.");
  }

  try {
    const response = await axios.get(`${Config.CRM_URL}/module/Accounts`, {
      headers: {
        Authorization: `Bearer ${Config.CRM_API_KEY}`,
      },
    });

    const fetchedUsers = response.data.data;

    if (!Array.isArray(fetchedUsers)) {
      console.error("Fetched users data is not an array:", fetchedUsers);
      return res
        .status(500)
        .send("Error: Fetched users data is not in expected format.");
    }

    const filteredUsers = fetchedUsers.filter(
      (userObj) =>
        userObj?.attributes?.name &&
        userObj?.attributes?.name.toLowerCase() === user.toLowerCase()
    );

    res.json(filteredUsers);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error fetching data");
  }
};

export const createUser = async (req, res) => {
  const newUser = req.query.name;

  if (!newUser || newUser.trim() === "") {
    console.error("Passed query parameter 'name' is not a valid value.");
    return res
      .status(400)
      .send("Error: 'name' query parameter is required and cannot be empty.");
  }

  const requestBody = {
    data: {
      type: "Accounts",
      attributes: {
        name: newUser,
      },
    },
  };

  try {
    const response = await axios.post(`${Config.CRM_URL}/module`, requestBody, {
      headers: {
        Authorization: `Bearer ${Config.CRM_API_KEY}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(
      "Something went wrong!",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error fetching data");
  }
};

export const deleteUser = async (req, res) => {
  const userid = req.query.userid;

  if (!userid || userid.trim() === "") {
    console.error("Passed query parameter 'id' is not a valid value.");
    return res
      .status(400)
      .send("Error: 'id' query parameter is required and cannot be empty.");
  }

  try {
    const response = await axios.delete(
      `${Config.CRM_URL}/module/Accounts/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${Config.CRM_API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Something went wrong!",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error fetching data");
  }
};
