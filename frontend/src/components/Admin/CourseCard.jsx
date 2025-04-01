const CourseCard = ({ course_name, teacher_id, students, _id, onDelete }) => {
  return (
    <div className="card m-4 border-2 border-green-400/20 hover:border-green-400/40 shadow-lg shadow-green-400/20 hover:shadow-green-400/30 w-72 md:w-80 lg:w-96 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] group">
      <div className="card-body p-5 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {" "}
            {/* Added min-w-0 for truncation */}
            <h2
              className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 truncate"
              title={course_name}
            >
              {course_name}
            </h2>
            <div className="flex items-center gap-2 mb-3">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  {teacher_id?.imageUrl ? (
                    <img
                      src={teacher_id.imageUrl}
                      alt={`${teacher_id.name}'s profile`}
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = ""; // Clear the error to prevent looping
                        e.currentTarget.parentElement.innerHTML = `
            <div class="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
              <span class="text-lg font-bold text-green-800">${
                teacher_id?.name?.charAt(0) || "T"
              }</span>
            </div>
          `;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-lg font-bold text-green-800">
                        {teacher_id?.name?.charAt(0) || "T"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="min-w-0">
                {" "}
                {/* Added min-w-0 for truncation */}
                <p
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate"
                  title={teacher_id?.name}
                >
                  {teacher_id?.name || "No teacher assigned"}
                </p>
                <p
                  className="text-xs text-gray-500 dark:text-gray-400 truncate"
                  title={teacher_id?.email}
                >
                  {teacher_id?.email || ""}
                </p>
              </div>
            </div>
          </div>

          <div className="badge badge-lg badge-outline badge-success gap-1 flex-shrink-0 ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            {students.length} {students.length === 1 ? "Student" : "Students"}
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-outline btn-success btn-sm px-5 hover:bg-green-500 hover:border-green-500 hover:text-white transition-all duration-300"
            onClick={() => onDelete(_id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
