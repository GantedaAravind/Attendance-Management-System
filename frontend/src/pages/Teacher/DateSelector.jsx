import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import moment from "moment";
import API from "../../config/axiosInstance.js";
import Lottie from "lottie-react";
import loading_animation from "../../assets/loading.json";
import notfound_animation from "../../assets/not_found.json";
import { FaCalendarAlt, FaArrowRight, FaSpinner } from "react-icons/fa";
import LoadingAnimation from "../../components/LoadingAnimation.jsx";

const DateSelector = () => {
  const { courseid } = useParams();
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    fetchCourseDates();
  }, []);

  const fetchCourseDates = async () => {
    try {
      const { data } = await API.get(`/api/teacher/course/${courseid}`);
      setCourseName(data.course.course_name);
      const { start_date, end_date } = data.course;
      generateDates(start_date, end_date);
    } catch (err) {
      console.error("Error fetching course:", err);
      setError(err.response?.data?.error || "Failed to load course data");
    } finally {
      setLoading(false);
    }
  };

  const generateDates = (start, end) => {
    let currentDate = moment(start);
    let endMoment = moment(end);
    let dateArray = [];

    while (currentDate <= endMoment) {
      dateArray.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "days");
    }

    setDates(dateArray);
  };

  const groupDatesByMonth = (dates) => {
    return dates.reduce((acc, date) => {
      const month = moment(date).format("MMMM YYYY");
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(date);
      return acc;
    }, {});
  };

  const generateFullMonthGrid = (month, datesInMonth) => {
    const startOfMonth = moment(month).startOf("month");
    const endOfMonth = moment(month).endOf("month");

    const monthGrid = [];
    let currentDate = startOfMonth.clone();

    for (let i = 0; i < currentDate.day(); i++) {
      monthGrid.push({ date: null, disabled: true });
    }

    while (currentDate <= endOfMonth) {
      const formattedDate = currentDate.format("YYYY-MM-DD");
      const isDisabled = !datesInMonth.includes(formattedDate);
      monthGrid.push({ date: formattedDate, disabled: isDisabled });
      currentDate.add(1, "day");
    }

    return monthGrid;
  };

  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const groupedDates = groupDatesByMonth(dates);

  return (
    <div className="p-5 max-w-6xl mx-auto bg-transparent">
      <div className="flex items-center gap-3 mb-6">
        <FaCalendarAlt className="text-blue-400 text-2xl" />
        <h2 className="text-2xl font-bold text-white">
          Select Date for <span className="text-blue-400">{courseName}</span>
        </h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-transparent">
          <div className="w-48 mx-auto">
            <LoadingAnimation />
          </div>
          <p className="mt-4 text-gray-300 flex items-center gap-2">
            <FaSpinner className="animate-spin" />
            Loading course dates...
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-transparent">
          <div className="w-64 mx-auto">
            <Lottie animationData={notfound_animation} />
          </div>
          <p className="mt-4 text-red-400 text-center max-w-md mx-auto">
            {error} <br />
            <Link
              to="/teacher/courses"
              className="text-blue-400 hover:underline mt-2 inline-block"
            >
              Back to courses
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-transparent">
          {Object.entries(groupedDates).map(([month, datesInMonth]) => {
            const monthGrid = generateFullMonthGrid(month, datesInMonth);

            return (
              <div
                key={month}
                className="bg-gray-800/70 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-blue-400 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
              >
                <div className="bg-gradient-to-r from-blue-900/80 to-blue-800/80 p-3 text-white font-bold text-center border-b border-gray-700">
                  {month}
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayHeaders.map((day) => (
                      <div
                        key={day}
                        className="text-center text-xs font-semibold text-gray-400 py-1"
                      >
                        {day[0]}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {monthGrid.map(({ date, disabled }, index) =>
                      date ? (
                        <Link
                          key={date}
                          to={`/teacher/courses/${courseid}/date/${date}/mark-attendance/`}
                          className={`flex items-center justify-center aspect-square p-1 text-sm ${
                            disabled
                              ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                              : "bg-blue-900/30 text-blue-300 hover:bg-blue-800/50 hover:text-white font-medium"
                          } rounded-full transition-all duration-200 relative group`}
                          style={{ pointerEvents: disabled ? "none" : "auto" }}
                        >
                          {moment(date).format("D")}
                          {!disabled && (
                            <span className="absolute -right-1 -bottom-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <FaArrowRight size={8} />
                            </span>
                          )}
                        </Link>
                      ) : (
                        <div key={index} className="aspect-square p-1"></div>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DateSelector;
