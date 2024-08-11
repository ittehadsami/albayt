const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const Doctor = require("./models/doctorModel");
const Service = require("./models/serviceModel");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// routes

// get
app.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    res.status(200).json(doctor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// post
app.post("/doctors", async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(200).json(doctor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update / edit
app.put("/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });

    if (!doctor) {
      return res
        .status(404)
        .json({ message: `Cannot find any doctor by ID ${id}` });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// delete
app.delete("/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) {
      return res
        .status(404)
        .json({ message: `cannot find any Doctor by ${id}` });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
///--------------------------Services--------------------------------
// get all services
app.get("/services", async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json(services);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// get a single service by id
app.get("/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: `Cannot find any service by ID ${id}` });
    }

    res.status(200).json(service);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// create a new service
app.post("/services", async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(200).json(service);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update an existing service
app.put("/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body, { new: true });

    if (!service) {
      return res.status(404).json({ message: `Cannot find any service by ID ${id}` });
    }
    res.status(200).json(service);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// delete a service
app.delete("/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ message: `Cannot find any service by ID ${id}` });
    }

    res.status(200).json(service);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});




mongoose
  .connect(
    "mongodb+srv://admin:admin123@albayt.dife0nx.mongodb.net/?retryWrites=true&w=majority&appName=albayt"
  )
  .then(() => {
    console.log("Connected to MondoDB");
    app.listen(port, () => {
      console.log(`Node API is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log(error);
  });
