import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import moment from "moment";
import API from "../../config/axiosInstance.js"; // Import API instance
import Lottie from "lottie-react";
import loading_animation from "../../assets/loading.json";
import notfound_animation from "../../assets/not_found.json";

const DateSelector = () => {
  const { courseid } = useParams(); // Get course ID from URL params

  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourseDates();
  }, []);

  // Fetch course data and generate dates
  const fetchCourseDates = async () => {
    try {
      const { data } = await API.get(`/api/teacher/course/${courseid}`); // Fetch course data

      const { start_date, end_date } = data.course;
      generateDates(start_date, end_date);
    } catch (err) {
      console.error("Error fetching course:", err);
      setError(err.response?.data?.error || "Failed to load course data");
    } finally {
      setLoading(false);
    }
  };

  // Generate date range
  const generateDates = (start, end) => {
    let currentDate = moment(start);
    let endMoment = moment(end);
    let dateArray = [];

    while (currentDate <= endMoment) {
      dateArray.push(currentDate.format("YYYY-MM-DD")); // Format: 2025-03-15
      currentDate.add(1, "days"); // Move to next day
    }

    setDates(dateArray);
  };

  // Group dates by month and generate full month grid
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

  // Generate a full month grid with disabled days outside the range
  const generateFullMonthGrid = (month, datesInMonth) => {
    const startOfMonth = moment(month).startOf("month");
    const endOfMonth = moment(month).endOf("month");

    const monthGrid = [];
    let currentDate = startOfMonth.clone();

    // Add empty days for the start of the month (if the month doesn't start on Sunday)
    for (let i = 0; i < currentDate.day(); i++) {
      monthGrid.push({ date: null, disabled: true });
    }

    // Fill in the days of the month
    while (currentDate <= endOfMonth) {
      const formattedDate = currentDate.format("YYYY-MM-DD");
      const isDisabled = !datesInMonth.includes(formattedDate);
      monthGrid.push({ date: formattedDate, disabled: isDisabled });
      currentDate.add(1, "day");
    }

    return monthGrid;
  };

  // Day headers for the calendar
  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const groupedDates = groupDatesByMonth(dates);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Select a Date Attendance</h2>

      {loading ? (
        <div className="w-[40%]  mx-auto">
          <Lottie animationData={loading_animation} />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">
          <Lottie animationData={notfound_animation} />
          <p>{error}</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {Object.entries(groupedDates).map(([month, datesInMonth]) => {
            const monthGrid = generateFullMonthGrid(month, datesInMonth);

            return (
              <div
                key={month}
                className="border-blue-400 border shadow-blue-400 p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold mb-2">{month}</h3>
                <div className="grid grid-cols-7 gap-2">
                  {/* Render day headers */}
                  {dayHeaders.map((day) => (
                    <div
                      key={day}
                      className="text-center font-bold text-gray-600"
                    >
                      {day}
                    </div>
                  ))}
                  {/* Render month grid */}
                  {monthGrid.map(({ date, disabled }, index) =>
                    date ? (
                      <Link
                        key={date}
                        to={`/teacher/courses/${courseid}/date/${date}/mark-attendance/`}
                        className={`p-3 text-center ${
                          disabled
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-700"
                        } rounded-lg transition`}
                        style={{ pointerEvents: disabled ? "none" : "auto" }}
                      >
                        {moment(date).format("DD")}
                      </Link>
                    ) : (
                      <div key={index} className="p-2"></div> // Empty cell for alignment
                    )
                  )}
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
