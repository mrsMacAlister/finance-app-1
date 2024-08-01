import "./budgeting.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Budgeting = () => {
  return (
    <div className="budgeting">
      <Sidebar />
      <div className="budgetingContainer">
        <Navbar />
        <div className="construction">
          <h2>This page is still under construction.</h2>
          <h2>Please check again later.</h2>
          <h2>Thank you.</h2>
        </div>
        <div className="first">
          <div className="left"></div>
          <div className="right"></div>
        </div>
      </div>
    </div>
  );
};

export default Budgeting;
