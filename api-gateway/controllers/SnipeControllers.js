import axios from "axios";

// Hardware Controllers
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
      res.status(500).send("Error fetching data");
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
      res.status(500).send("error fetching data");
    }
  },

  updateHardwareById: async (req, res) => {
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
        `${process.env.SNIPEIT_API_URL}/hardware/${request.id}`,
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
      res.status(500).send("Error fetching data");
    }
  },
};

// Status Label Controllers
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
