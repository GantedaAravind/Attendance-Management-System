import mongoose from "mongoose";
import bcrypt from "bcrypt";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "teacher",
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // Store the URL of the teacher's profile image
    default:
      "https://w7.pngwing.com/pngs/3/495/png-transparent-avatar-of-a-teacher-male.png", // Default image if none is provided
  },
});

// Pre-save middleware to hash the password before saving
teacherSchema.pre("save", async function (next) {
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
teacherSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("Teacher", teacherSchema);
