const mongoose = require("mongoose");
const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the service's name"],
    },
    description: {
      type: String,
      required: [true, "Please enter the service's deescription"],
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
