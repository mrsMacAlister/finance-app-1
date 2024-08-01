import "./calendar.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Calendar = () => {
  return (
    <div className="calendar">
      <Sidebar />
      <div className="calendarContainer">
        <Navbar />
        <div className="construction">
          <h2>This page is still under construction.</h2>
          <h2>Please check again later.</h2>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
