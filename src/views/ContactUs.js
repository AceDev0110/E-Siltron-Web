import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { SocialIcon } from 'react-social-icons';
import './../assets/css/contactus.css';

export default function ContactUs() {
  return (
    <>
      <div className="content" style={{ margin: 30, marginTop: 120 }}>
        <h1 style={{ textAlign: 'center', marginBottom : 100 }}>Contact Us</h1>
        <Row style={{ justifyContent: 'center' }}>
          <div className="textDiv">
            <text className="boldText"> SILTRON </text>
            <text className="lightText"> HILAL AL EMARAT GENERAL TRADING L.L.C </text>

            <text className="boldText"> ADDRESS: </text>
            <text className="lightText"> SHOP NO.4 AL WARI BUILDING</text>
            <text className="lightText"> 21A STREET, NAIF AREA, DEIRA, DUBAI, U.A.E </text>

            <text className="boldText"> TEL NUMBERS: </text>
            <text className="lightText"> LANDLINE: +9714-2227653 </text>
            <text className="lightText"> MOBILE: +971-505858899 </text>
            <text className="lightText"> WHATSAPP: +971505858899 </text>

            <text className="boldText"> EMAIL: </text>
            <text className="lightText"> hilalgen@eim.ae </text>
          </div>

          <div style={{ border: '0px solid gray', borderRightWidth: 1, marginLeft: 20, marginRight: 20 }} />
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={styles.socialIconDiv}>
              <SocialIcon style={styles.socialIconStyle} target="_blank" url="https://www.instagram.com/siltron_electronics" />
              <SocialIcon style={styles.socialIconStyle} target="_blank" url="https://m.facebook.com/Siltron-Electronics-107902611034439" />
              <SocialIcon style={styles.socialIconStyle} target="_blank" url="https://www.youtube.com/channel/UCL2QyJvPPuoJvyGBttL5gPQ" />
            </div>

            <div>
              <a href="https://www.amazon.ae/s?me=A14HXOL16FUM7T&marketplaceID=A2VIGQ35RCS4UG" target="_blank">
                <div className = "shopNowBtn">
                  <img className="amazonImage" src={require("./../Images/amazon.jpeg")} />
                  <p className="amazonP">SHOP NOW</p>
                </div>
              </a>
            </div>
          </div>
        </Row>
      </div>
    </>
  );
}

const styles = {
  socialIconDiv: {
    minWidth: 300,
    justifyContent: 'center',
    display: 'flex'
  },
  socialIconStyle: {
    margin: 10,
  }
}