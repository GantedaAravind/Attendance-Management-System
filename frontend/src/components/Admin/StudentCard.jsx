const StudentCard = ({ name, email, _id, onDelete, imageUrl }) => {
  return (
    <div className="card m-4 border-2 border-blue-400/20 overflow-hidden hover:border-blue-400/40 shadow-lg shadow-blue-400/20 hover:shadow-blue-400/30 w-72 md:w-80 lg:w-96 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] group">
      <div className="card-body p-5 md:p-6">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="avatar">
            <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl ring-2 ring-blue-400/30 group-hover:ring-blue-400/50 transition-all duration-300 overflow-hidden">
              <img
                src={imageUrl || "https://i.pravatar.cc/150?img=5"}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://i.pravatar.cc/150?img=5";
                }}
              />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-base md:text-lg font-bold text-gray-800 truncate dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
              {name}
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-300 mt-1 truncate">
              {email}
            </p>
            <div className="mt-2 flex gap-2 flex-wrap">
              <span className="badge badge-outline badge-primary text-xs">
                Student
              </span>
              <span className="badge badge-outline text-xs">
                ID: {_id.slice(-6)}
              </span>
            </div>
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-outline btn-primary btn-sm px-4 md:px-5 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300"
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

export default StudentCard;
