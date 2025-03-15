import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
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
    default: "admin",
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // Store the URL of the teacher's profile image
    default:
      "https://w7.pngwing.com/pngs/3/495/png-transparent-avatar-of-a-teacher-male.pnghttps://img.freepik.com/premium-photo/anime-male-avatar_950633-956.jpg", // Default image if none is provided
  },
});

// Pre-save middleware to hash the password before saving
adminSchema.pre("save", async function (next) {
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
adminSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("Admin", adminSchema);
