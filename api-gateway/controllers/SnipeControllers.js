// SnipeControllers.js

import axios from "axios";

export const StockControllers = {
  getAllStocks: async (req, res) => {
    try {
      const response = await axios.get(
        `${process.env.SNIPEIT_API_URL}/hardware`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      res.json(response.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message,
      );
      res.status(500).send("Error fetching hardware data");
    }
  },

  getStocksById: async (req, res) => {
    const hardwareid = req.params.id;

    if (!hardwareid || hardwareid.trim() === "") {
      console.error("passed parameter 'hardwareid' is not a valid value.");
      return res
        .status(400)
        .send("error: 'hardwareid' parameter is required and cannot be empty.");
    }

    try {
      const response = await axios.get(
        `${process.env.SNIPEIT_API_URL}/hardware/${hardwareid}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      res.json(response.data);
    } catch (error) {
      console.error(
        "error fetching data:",
        error.response ? error.response.data : error.message,
      );
      res.status(500).send("Error fetching hardware data");
    }
  },

  createItem: async (req, res) => {
    const request = req.body;

    const requestBody = {
      model_id: request?.model_id,
      status_id: request?.status_id,
      asset_tag: request?.asset_tag,
      name: request?.name,
      serial: request?.serial,
      purchase_date: request?.purchase_date,
      purchase_cost: request?.purchase_cost,
      order_number: request?.order_number,
      supplier_id: request?.supplier_id,
    };

    try {
      const response = await axios.post(
        `${process.env.SNIPEIT_API_URL}/hardware`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      res.json(response.data);
    } catch (error) {
      console.error(
        "Something went wrong!",
        error.response ? error.response.data : error.message,
      );
      res.status(500).send("Error in creating hardware.");
    }
  },

  updateItemById: async (req, res) => {
    const request = req.body;
    const hardwareId = req.params.id;

    const requestBody = {
      asset_tag: request?.asset_tag,
      notes: request?.notes,
      status_id: request?.status_id,
      model_id: request?.model_id,
      last_checkout: request?.last_checkout,
      assigned_user: request?.assigned_user,
      assigned_location: request?.assigned_location,
      serial: request?.serial,
      order_number: request?.order_number,
      warranty_months: request?.warranty_months,
      purchase_cost: request?.purchase_cost,
      purchase_date: request?.purchase_date,
      requestable: request?.requestable,
      archived: request?.archived,
      name: request?.name,
    };

    try {
      const response = await axios.patch(
        `${process.env.SNIPEIT_API_URL}/hardware/${hardwareId}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      res.json(response.data);
    } catch (error) {
      console.error(
        "Something went wrong!",
        error.response ? error.response.data : error.message,
      );
      res.status(500).send("Error in updating hardware.");
    }
  },

  deleteItemById: async (req, res) => {
    const hardwareId = req.params.id;

    if (!hardwareId || hardwareId.trim() === "") {
      console.error("passed parameter 'hardwareId' is not a valid value.");
      return res
        .status(400)
        .send("error: 'hardwareId' parameter is required and cannot be empty.");
    }

    try {
      const response = await axios.delete(
        `${process.env.SNIPEIT_API_URL}/hardware/${hardwareId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      res.json(response.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message,
      );
      res.status(500).send("Error in deleting hardware.");
    }
  },
};

export const StatusLabelControllers = {
  getAllStatusLabels: async (req, res) => {
    try {
      const response = await axios.get(
        `${process.env.SNIPEIT_API_URL}/statuslabels`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
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
  },

  getStatusLabelById: async (req, res) => {
    const statusLabelId = req.params.id;

    if (!statusLabelId || statusLabelId.trim() === "") {
      console.error("passed parameter 'statusLabelId' is not a valid value.");
      return res
        .status(400)
        .send(
          "error: 'statusLabelId' parameter is required and cannot be empty.",
        );
    }

    try {
      const response = await axios.get(
        `${process.env.SNIPEIT_API_URL}/statuslabels/${statusLabelId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      res.json(response.data);
    } catch (error) {
      console.error(
        "error fetching data:",
        error.response ? error.response.data : error.message,
      );
      res.status(500).send("Error in getting status label with inputted id.");
    }
  },

  updateStatusLabel: async (req, res) => {
    const request = req.body;

    const requestBody = {
      name: request?.name,
      type: request?.type,
      notes: request?.notes,
      color: request?.color,
      show_in_nav: request?.show_in_nav,
      default_label: request?.default_label,
    };

    try {
      const response = await axios.patch(
        `${process.env.SNIPEIT_API_URL}/statuslabels/${req.params.id}`, // Use the ID from the route parameters
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      res.json(response.data);
    } catch (error) {
      console.error(
        "Something went wrong!",
        error.response ? error.response.data : error.message,
      );
      res.status(500).send("Error in updating status label.");
    }
  },

  deleteStatusLabelById: async (req, res) => {
    const statusLabelId = req.params.id;

    if (!statusLabelId || statusLabelId.trim() === "") {
      console.error("passed parameter 'statusLabelId' is not a valid value.");
      return res
        .status(400)
        .send(
          "error: 'statusLabelId' parameter is required and cannot be empty.",
        );
    }

    try {
      const response = await axios.delete(
        `${process.env.SNIPEIT_API_URL}/statuslabels/${statusLabelId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      res.json(response.data);
    } catch (error) {
      console.error(
        "error fetching data:",
        error.response ? error.response.data : error.message,
      );
      res.status(500).send("Error in deleting status label.");
    }
  },

  createStatusLabel: async (req, res) => {
    const request = req.body;

    const requestBody = {
      name: request?.name,
      type: request?.type,
      notes: request?.notes,
      color: request?.color,
      show_in_nav: request?.show_in_nav,
      default_label: request?.default_label,
    };

    try {
      const response = await axios.post(
        `${process.env.SNIPEIT_API_URL}/statuslabels`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      // Return the created status label details in the response.
      res.json(response.data);
    } catch (error) {
      console.error(
        "Something went wrong!",
        error.response ? error.response.data : error.message,
      );
      res.status(500).send("Error in creating status label.");
    }
  },
};

export const UserControllers = {
  getAllUsers: async (req, res) => {
    try {
      const response = await axios.get(`${process.env.SNIPEIT_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message,
      );
      res.status(500).send("Error fetching data");
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;

    if (!userId || userId.trim() === "") {
      console.error("passed parameter 'userId' is not a valid value.");
      return res
        .status(400)
        .send("error: 'userId' parameter is required and cannot be empty.");
    }

    try {
      const response = await axios.get(
        `${process.env.SNIPEIT_API_URL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      res.json(response.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message,
      );
      res.status(500).send("Error fetching user/s.");
    }
  },

  createUser: async (req, res) => {
    const request = req.body;

    const requestBody = {
      first_name: request?.first_name,
      last_name: request?.last_name,
      username: request?.username,
      password: request?.password,
      password_confirmation: request?.password_confirmation,
      email: request?.email,
      permissions: request?.permissions,
      activated: request?.activated,
      phone: request?.phone,
      jobtitle: request?.jobtitle,
      manager_id: request?.manager_id,
      employee_num: request?.employee_num,
      notes: request?.notes,
      company_id: request?.company_id,
      two_factor_enrolled: request?.two_factor_enrolled,
      two_factor_optin: request?.two_factor_optin,
      department_id: request?.department_id,
      location_id: request?.location_id,
      remote: request?.remote,
      groups: request?.groups,
      vip: request?.vip,
      start_date: request?.start_date,
      end_date: request?.end_date,
    };

    try {
      const response = await axios.post(
        `${process.env.SNIPEIT_API_URL}/users`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      res.json(response.data);
    } catch (error) {
      console.error(
        "Something went wrong!",
        error.response ? error.response.data : error.message,
      );
      res.status(500).send("Error in creating status label.");
    }
  },

  updateUserById: async (req, res) => {
    const request = req.body;
    const userId = req.params.id;

    const requestBody = {
      username: request?.username,
      password: request?.password,
      email: request?.email,
      permissions: request?.permissions,
      activated: request?.activated,
      phone: request?.phone,
      jobtitle: request?.jobtitle,
      manager_id: request?.manager_id,
      employee_num: request?.employee_num,
      notes: request?.notes,
      company_id: request?.company_id,
      two_factor_enrolled: request?.two_factor_enrolled,
      two_factor_optin: request?.two_factor_optin,
      department_id: request?.department_id,
      location_id: request?.location_id,
      remote: request?.remote,
      groups: request?.groups,
      vip: request?.vip,
      start_date: request?.start_date,
      end_date: request?.end_date,
    };

    try {
      const response = await axios.patch(
        `${process.env.SNIPEIT_API_URL}/users/${userId}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      res.json(response.data);
    } catch (error) {
      console.error(
        "Something went wrong!",
        error.response ? error.response.data : error.message,
      );
      res.status(500).send("Error in updating hardware.");
    }
  },

  deleteUserById: async (req, res) => {
    const userId = req.params.id;

    if (!userId || userId.trim() === "") {
      console.error("passed parameter 'userId' is not a valid value.");
      return res
        .status(400)
        .send("error: 'userId' parameter is required and cannot be empty.");
    }

    try {
      const response = await axios.delete(
        `${process.env.SNIPEIT_API_URL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      res.json(response.data);
    } catch (error) {
      console.error(
        "Error deleting data:",
        error.response ? error.response.data : error.message,
      );
      res.status(500).send("Error in deleting user.");
    }
  },
};
