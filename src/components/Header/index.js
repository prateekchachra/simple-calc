import React from "react";
import PropTypes from "prop-types";

import "./style.css";

/**
 * Header for the calculator
 * @param {title} Title for the Header
 */

const Header = ({ title = "" }) => (
  <h1 className="header-animated"> {title} </h1>
);

// Prop types
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// We use React memo so the component won't re-render every time since the title never changes
export default React.memo(Header);
