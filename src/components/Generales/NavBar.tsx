// @ts-nocheck

import React, { useState } from "react";

const NavBar = ({ setActivePage, activePage }) => {
  return (
    <div className="navBar">
      <img
        onClick={() => {
          setActivePage("home");
        }}
        className={activePage == "home" ? "activeIcon" : null}
        src="icon_home.png"
      />
      <img
        onClick={() => {
          setActivePage("marketplace");
        }}
        className={activePage == "marketplace" ? "activeIcon" : null}
        src="icon_marketplace.png"
      />
      <img
        onClick={() => {
          setActivePage("investidores");
        }}
        className={activePage == "investidores" ? "activeIcon" : null}
        src="icon_invest.png"
      />
      <img
        onClick={() => {
          setActivePage("gInvestidores");
        }}
        className={activePage == "gInvestidores" ? "activeIcon" : null}
        src="icon_grandesInvest.png"
      />
    </div>
  );
};

export default NavBar;
