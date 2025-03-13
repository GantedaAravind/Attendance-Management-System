import mongoose from "mongoose";
import bcrypt from "bcrypt";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "student",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Reference to the Course model
    },
  ],
});

// Pre-save middleware to hash the password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to verify the password
studentSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("Student", studentSchema);
