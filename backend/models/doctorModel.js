const mongoose = require("mongoose");
const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the doctor's name"],
    },
    specialization: {
      type: String,
      required: [true, "Please enter the doctor's specialization"],
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
