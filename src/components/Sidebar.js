import React from "react";
import logo from "../icons/Oak tree logo.svg";
import icon1 from "../icons/icon-1.svg";
import icon2 from "../icons/icon-2.svg";
import icon3 from "../icons/icon-3.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="logo" />{" "}
        <div>
          <h2>Oak Tree Cemetery</h2>
          <span>Process Manager</span>
        </div>
      </div>
      <div className="sidebar-item active">
        <img src={icon1} alt="organizations icon" /> <span>Organizations</span>
      </div>
      <div className="sidebar-item">
        <img src={icon2} alt="contractors icon" /> <span>Contractors</span>
      </div>
      <div className="sidebar-item">
        <img src={icon3} alt="clients icon" /> <span>Clients</span>
      </div>
    </div>
  );
};

export default Sidebar;
