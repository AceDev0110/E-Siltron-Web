import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import navigation from "./data";
//import Navigation from './components/Navbar';
import { ReactComponent as Logo } from "./assets/logo.svg";
import Header from './components/Header';
import Routes from './Routes';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import MobileStoreButton from 'react-mobile-store-button';
function App() {
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top < -60);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);


  useEffect(() => {
    document.title = "SILTRON ELECTRONICS"
  }, []);

  const iosUrl = 'https://itunes.apple.com/us/app/all-of-the-lights/id959389722?mt=8';
  //const andUrl = 'https://itunes.apple.com/us/app/all-of-the-lights/id959389722?mt=8';
  const andUrl = 'https://play.google.com/store/apps/details?id=com.siltron';
  return (
    <div className="App">
      {/* <Navigation /> */}
      <BrowserView>
        <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
          <Header items={navigation} logo={<Logo />} navPosition="center" isSticky={isSticky} />
        </div>
        <Routes />
      </BrowserView>

      <MobileView style={{ height: '100vh', display: 'flex' }}>
        <div style={{ margin: 'auto' }}>
          <div>
            <h3 style={{ textAlign: 'center', padding : 20 }}>PLEASE DOWNLOAD APK FILE</h3>
          </div>

          <div style = {{ display : 'flex', justifyContent : 'center' , marginLeft : 60}}>
            <MobileStoreButton
              store="android"
              url={andUrl}
              linkProps={{ title: 'a Store Button' }}
            />
          </div>

          {/* <div>
            <MobileStoreButton
              store="ios"
              url={iosUrl}
              linkProps={{ title: 'a Store Button' }}
            />
          </div> */}
        </div>
      </MobileView>
    </div>
  );
}

export default App;
