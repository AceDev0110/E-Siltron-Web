import React from "react";
import s from "./header-nav.module.scss";

const HeaderNav = React.forwardRef(({ items, isMenuOpen }, ref) => {
  const openClass = isMenuOpen ? s.open : "";

  return (
    <nav className={`${s.nav} ${openClass}`} ref={ref}>
      {items.map(item => (
        <a
          href={item.slug}
          key={item.id}
          className={`${s.nav__item}`}
          ref={item.ref}
        >
          {item.name}
        </a>
      ))}
      
      <a href="https://www.amazon.ae/s?me=A14HXOL16FUM7T&marketplaceID=A2VIGQ35RCS4UG" target="_blank">
      <img className="amazonImage" src={require("./../../Images/amazon.jpeg")} style = {{ width : 140, height : 60, borderRadius : 10, borderWidth : 2, borderColor : '#d0b039', borderStyle : 'solid'}} />
        </a>
        

      {/* <div>
        <a href="https://www.amazon.ae/s?me=A14HXOL16FUM7T&marketplaceID=A2VIGQ35RCS4UG" target="_blank">
          <div className="shopNowBtn">
            <img className="amazonImage" src={require("./../../Images/amazon.jpeg")} />
            <p className="amazonP">SHOP NOW</p>
          </div>
        </a>
      </div> */}
    </nav>
  );
});

export default HeaderNav;
