import React from "react";
import "./settings.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Category from "../../components/category/Category";
import PaymentM from "../../components/paymentM/PaymentM";

const Settings = () => {
  return (
    <div className="settings">
      <Sidebar />
      <div className="settingsContainer">
        <Navbar />
        <div className="heading">
          <h2>Settings</h2>
        </div>
        <div className="categories">
          <Category />
        </div>
        <div className="payments">
          <PaymentM />
        </div>
      </div>
    </div>
  );
};

export default Settings;
