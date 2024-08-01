import "./resources.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Resources = () => {
  return (
    <div className="resources">
      <Sidebar />
      <div className="resourcesContainer">
        <Navbar />
        <div className="construction">
          <h2>This page is still under construction.</h2>
          <h2>Please check again later.</h2>
        </div>
      </div>
    </div>
  );
};

export default Resources;
