import React from "react";
import s from "./header-burger.module.scss";

const HeaderBurger = ({ toggleNav, isMenuOpen }) => {
  const openClass = isMenuOpen ? s.open : "";
  return (
    <div className={`${s.burger} ${openClass}`} onClick={() => toggleNav()}>
      <span className={s.burger__line} />
      <span className={s.burger__line} />
      <span className={s.burger__line} />
    </div>
  );
};

export default HeaderBurger;
