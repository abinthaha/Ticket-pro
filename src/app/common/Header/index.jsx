import React, { useState } from "react";
import { Link } from "react-router-dom";

import './index.scss';

function HeaderComponent({ userData }) {
  const [] = useState(0);

  return (
    <div className="header-wrapper">
      {userData && userData.name ? <h2>{userData.name}</h2> : ""}
      <Link className="btn primary-btn create-ticket-btn" to="/create-ticket">
        Create Ticket
      </Link>
    </div>
  );
}

export default HeaderComponent;
