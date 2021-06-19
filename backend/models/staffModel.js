import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

//clockin schema
const clockinSchema = new mongoose.Schema(
  {
    clockedInAt: { type: Date },
    staff: { type: ObjectId, ref: "Staff" },
  },
  { timestamps: true }
);

//clockout schema
const clockoutSchema = new mongoose.Schema(
  {
    clockedOutAt: { type: Date },
    staff: { type: ObjectId, ref: "Staff" },
  },
  { timestamps: true }
);

// staff schema
const staffSchema = new mongoose.Schema(
  {
    staffId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    slug: { type: String, required: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    clockIns: [clockinSchema],
    clockOuts: [clockoutSchema],
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
