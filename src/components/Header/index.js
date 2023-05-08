import React, { useState, useRef, createRef, useEffect } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import HeaderNav from "./HeaderNav";
import HeaderLogo from "./HeaderLogo";
import HeaderBurger from "./HeaderBurger";
import { useMediaQuery } from "../../hooks";
import s from "./header.module.scss";



const Header = ({ items, logo, navPosition, isSticky }) => {
  //Setup state to determine if menu is open or not
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 989px)");

  //Setup the Nav ref
  const navRef = useRef();

  //Loop through the items and create a state of navItems with refs
  //to use for our animation
  const [navItems] = useState(
    items.map(item => {
      return {
        ...item,
        ref: createRef()
      };
    })
  );

  //Setup a timeline to use
  const [menuTL] = useState(
    gsap.timeline({
      paused: true,
      defaults: { duration: 1, ease: "expo.out" }
    })
  );

  //Setup menuTL things and account for window resize events
  useEffect(() => {
    //Build the timeline and worry about resize events
    if (navPosition === "right" || navPosition === "center") {
      //Create an array with just the ref of the nav items
      const itemsRefs = navItems.map(item => item.ref.current);

      if (isSmallScreen) {
        menuTL
          .fromTo(navRef.current, { opacity: 0 }, { opacity: 1 })
          .fromTo(
            itemsRefs,
            { autoAlpha: 0, y: 48 },
            { autoAlpha: 1, y: 0, stagger: 0.1 },
            "-=0.4"
          )
          .reverse();
      } else {
        menuTL
          .seek(0)
          .clear()
          .pause();
        gsap.set([navRef.current, itemsRefs], { clearProps: "all" });
      }
    }
  }, [isSmallScreen]);




  //Setup menuTL things to work on any screen size
  useEffect(() => {
    //Build the timeline and keep it for a full overlay all the time
    if (navPosition === "overlay") {
      //Create an array with just the ref of the nav items
      const itemsRefs = navItems.map(item => item.ref.current);

      menuTL
        .fromTo(navRef.current, { opacity: 0 }, { opacity: 1 })
        .fromTo(
          itemsRefs,
          { autoAlpha: 0, y: 48 },
          { autoAlpha: 1, y: 0, stagger: 0.1 },
          "-=0.4"
        )
        .reverse();
    }
  }, []);

  //Run menuTL base on Menu State
  useEffect(() => {
    menuTL.reversed(!isMenuOpen);
  }, [isMenuOpen]);

  //onClick function to set state of menu
  const toggleNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={s.header}>

      {
        !isSticky &&
        (<div className={s.titleContainer}>
          <h1 className={s.title}> SILTRON ELECTRONICS </h1>
          {/* <p>My Cart</p> */}
        </div>)
      }


      <hr></hr>

      <div className={s.header__wrapper} data-nav-position={navPosition}>
        {/* <HeaderLogo logo={logo} /> */}
        <HeaderNav items={navItems} isMenuOpen={isMenuOpen} ref={navRef} />
        <HeaderBurger toggleNav={toggleNav} isMenuOpen={isMenuOpen} />
      </div>

      <hr></hr>
    </header>
  );
};

export default Header;

//Adding some propTypes for some checks and balances
Header.propTypes = {
  items: PropTypes.array.isRequired,
  logo: PropTypes.element.isRequired,
  navPosition: PropTypes.oneOf(["center", "right", "overlay"])
};

// Specifies the default value for the nvaPosition prop:
Header.defaultProps = {
  navPosition: "center"
};
