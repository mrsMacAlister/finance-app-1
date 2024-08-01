import "./navbar.scss";
//import avatar from "../../visuals/avatar.jpg";
//import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
//import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
//import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="items">
        <div className="item">
          <span className="currency" style={{ marginRight: 5 }}>
            Currency
          </span>
          <EuroOutlinedIcon className="icon" />
        </div>
        <div className="item">
          <DarkModeOutlinedIcon className="icon" />
        </div>
        {/* <div className="item">
          <FullscreenExitOutlinedIcon className="icon" />
        </div>
        <div className="item">
          <NotificationsNoneOutlinedIcon className="icon" />
          <div className="counter">1</div>
  </div> */}
        <div className="item">
          <ListOutlinedIcon className="icon" />
        </div>
        {/*<div className="item">
          <img src={avatar} alt="" className="avatar" />
</div>*/}
      </div>
    </div>
  );
};

export default Navbar;
