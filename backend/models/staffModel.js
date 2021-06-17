import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    staffId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    email: { type: String, required: true },
    age: { type: String },
    department: { type: String },
    maritalStatus: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
