const CourseCard = ({ course_name, teacher_id, students, _id, onDelete }) => {
  return (
    <div className="card m-4 border border-green-400 shadow-xl shadow-green-400  w-72 md:w-80 lg:w-96 bg-base-100 card-lg">
      <div className="card-body">
        <h2 className="w-16 md:w-20 lg:w-24 font-semibold">{course_name}</h2>
        <p className="text-sm text-zinc-400">
          Teacher: {teacher_id?.name} ({teacher_id?.email})
        </p>
        <p className="text-sm text-zinc-400">
          Students Enrolled: {students.length}
        </p>

        <div className="justify-end card-actions">
          <button
            className="btn btn-outline btn-secondary"
            onClick={() => onDelete(_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
