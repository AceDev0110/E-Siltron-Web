import React from "react";
import s from "./header-logo.module.scss";

const HeaderLogo = ({ logo }) => {
  return <div className={s.logo}>{logo}</div>;
};

export default HeaderLogo;
