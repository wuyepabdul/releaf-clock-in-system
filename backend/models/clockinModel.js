const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const date = new Date("2022-03-19T20:47:43.041+00:00");

const clockinSchema = new mongoose.Schema(
  {
    staff: { type: ObjectId, ref: "Staff" },
    staffId: { type: String },
    clockedIn: { type: Boolean, default: false },
    clockedInAt: { type: Date, default: date },
    clockedOut: { type: Boolean, default: false, timestamps: true },
    clockedOutAt: { type: Date, default: date, timestamps: true },
  },
  { timestamps: true }
);

const Clockin = mongoose.model("Clockin", clockinSchema);
module.exports = Clockin;
