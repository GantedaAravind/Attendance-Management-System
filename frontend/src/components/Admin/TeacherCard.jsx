const TeacherCard = ({ name, email, _id, onDelete, imageUrl }) => {
  return (
    <div className="card m-4 border-2 border-pink-400/20 hover:border-pink-400/40 shadow-lg shadow-pink-400/20 hover:shadow-pink-400/30 w-96 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] group">
      <div className="card-body p-6">
        <div className="flex items-center gap-6">
          <div className="avatar">
            <div className="w-20 h-20 rounded-xl ring-2 ring-pink-400/30 group-hover:ring-pink-400/50 transition-all duration-300 overflow-hidden">
              <img
                src={imageUrl || "https://i.pravatar.cc/150?img=3"}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://i.pravatar.cc/150?img=3";
                }}
              />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white truncate">
              {name}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-300 mt-1 truncate">
              {email}
            </p>
            <div className="mt-2 flex gap-2 flex-wrap">
              <span className="badge badge-outline badge-secondary text-xs">
                Teacher
              </span>
              <span className="badge badge-outline text-xs">
                ID: {_id.slice(-6)}
              </span>
            </div>
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-outline btn-secondary btn-sm px-5 hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all duration-300"
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

export default TeacherCard;
