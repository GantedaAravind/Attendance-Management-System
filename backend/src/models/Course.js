import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

export default mongoose.model("Course", courseSchema);
