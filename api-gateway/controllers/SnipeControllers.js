import axios from "axios";

export const HardwareControllers = {
  getAllHardware: async (req, res) => {
    try {
      const response = await axios.get(
        `${process.env.SNIPEIT_API_URL}/hardware`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SNIPEIT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
      res.status(500).send("Error fetching hardware data");
    }
  },

  getHardwareById: async (req, res) => {
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
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error(
        "error fetching data:",
        error.response ? error.response.data : error.message
      );
      res.status(500).send("Error fetching hardware data");
    }
  },

  createHardware: async (req, res) => {
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
        }
      );

      res.json(response.data);
    } catch (error) {
      console.error(
        "Something went wrong!",
        error.response ? error.response.data : error.message
      );
      res.status(500).send("Error in creating hardware.");
    }
  },

  updateHardware: async (req, res) => {
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
        }
      );

      res.json(response.data);
    } catch (error) {
      console.error(
        "Something went wrong!",
        error.response ? error.response.data : error.message
      );
      res.status(500).send("Error in updating hardware.");
    }
  },

  deleteHardwareById: async (req, res) => {
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
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
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
  },

  getStatusLabelById: async (req, res) => {
    const statusLabelId = req.params.id;

    if (!statusLabelId || statusLabelId.trim() === "") {
      console.error("passed parameter 'statusLabelId' is not a valid value.");
      return res
        .status(400)
        .send(
          "error: 'statusLabelId' parameter is required and cannot be empty."
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
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error(
        "error fetching data:",
        error.response ? error.response.data : error.message
      );
      res.status(500).send("error fetching data");
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
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error(
        "Something went wrong!",
        error.response ? error.response.data : error.message
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
          "error: 'statusLabelId' parameter is required and cannot be empty."
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
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error(
        "error fetching data:",
        error.response ? error.response.data : error.message
      );
      res.status(500).send("error fetching data");
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
        }
      );

      // Return the created status label details in the response.
      res.json(response.data);
    } catch (error) {
      console.error(
        "Something went wrong!",
        error.response ? error.response.data : error.message
      );
      res.status(500).send("Error in creating status label.");
    }
  },
};
