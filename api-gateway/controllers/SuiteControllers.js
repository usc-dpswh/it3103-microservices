// SuiteControllers.js

import axios from "axios";

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
      },
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message,
    );
    res.status(500).send("Error fetching data");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.SUITECRM_API_URL}/module/Accounts`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SUITECRM_API_KEY}`,
        },
      },
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message,
    );
    res.status(500).send("Error fetching data");
  }
};

export const getUserById = async (req, res) => {
  const userid = req.params.id;

  if (!userid || userid.trim() === "") {
    console.error("Passed parameter 'id' is not a valid value.");
    return res
      .status(400)
      .send("Error: 'id' parameter is required and cannot be empty.");
  }

  try {
    const response = await axios.get(
      `${process.env.SUITECRM_API_URL}/module/Accounts/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SUITECRM_API_KEY}`,
        },
      },
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message,
    );
    res.status(500).send("Error fetching data");
  }
};

export const createUser = async (req, res) => {
  const newUser = req.body.name;

  const requestBody = {
    data: {
      type: "Accounts",
      attributes: {
        name: newUser,
      },
    },
  };

  try {
    const response = await axios.post(
      `${process.env.SUITECRM_API_URL}/module`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${process.env.SUITECRM_API_KEY}`,
        },
      },
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Something went wrong!",
      error.response ? error.response.data : error.message,
    );
    res.status(500).send("Error fetching data");
  }
};

export const deleteUser = async (req, res) => {
  const userid = req.body.userid;

  if (!userid || userid.trim() === "") {
    console.error("Passed query parameter 'id' is not a valid value.");
    return res
      .status(400)
      .send("Error: 'id' query parameter is required and cannot be empty.");
  }

  try {
    const response = await axios.delete(
      `${process.env.SUITECRM_API_URL}/module/Accounts/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SUITECRM_API_KEY}`,
        },
      },
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Something went wrong!",
      error.response ? error.response.data : error.message,
    );
    res.status(500).send("Error fetching data");
  }
};

export const updateUser = async (req, res) => {
  const request = req.body;

  const requestBody = {
    data: {
      type: "Accounts",
      id: request.id,
      attributes: {
        name: request.updatedName,
      },
    },
  };

  try {
    const response = await axios.patch(
      `${process.env.SUITECRM_API_URL}/module`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${process.env.SUITECRM_API_KEY}`,
        },
      },
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Something went wrong!",
      error.response ? error.response.data : error.message,
    );
    res.status(500).send("Error fetching data");
  }
};
