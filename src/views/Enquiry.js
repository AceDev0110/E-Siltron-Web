import React, { useState, useEffect } from "react";
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
import './../assets/css/enquiry.css';
import axios from 'axios';

var xhr;
export default function Enquiry() {
  const [items, setItems] = useState([]);
  const [emailValue, SetEmailValue] = useState("");
  useEffect(() => {
    let lsItems = JSON.parse(localStorage.getItem('prepareEnquiry')) || [];
    setItems(lsItems);

    xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
    })
  }, [])

  const onEnquire = () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(emailValue)) {
      alert("Please input correct email.");
      return;
    }

    var sendItems = [];
    for (const item of items) {
      var sendItem = {
        imageurl: item.uri,
        number: item.number
      }
      sendItems[sendItems.length] = sendItem;
    }

    var sendData = JSON.stringify({
      email: emailValue,
      enquiry: sendItems
    });

    console.log(sendData);
    // xhr.open('POST', 'https://us-central1-siltron-app.cloudfunctions.net/sendMailOverHTTP');
    // xhr.send(sendData);


    try {
      axios({
        method: 'post',
        //url: 'https://us-central1-siltron-app.cloudfunctions.net/sendMailOverHTTP',
        url: 'https://us-central1-siltron-app.cloudfunctions.net/sendmail',
        headers: {
          Accept: "application/json",
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json",
        },
        data: sendData
      });
      alert("Your enquiry sent successfully.");
    } catch (error) {
      alert(error);
    }
  }

  const onRemoveItemClicked = (item) => {
    console.log("Remove", item);
    let newItems = [];
    for (let i = 0; i < items.length; i++)
      if (item.imagename != items[i].imagename)
        newItems.push(items[i]);
    localStorage.setItem('prepareEnquiry', JSON.stringify(newItems));
    setItems(newItems);
  }


  function RenderItem(props) {
    const onRemoveClicked = () => {
      console.log("remove");
      props._onRemoveClicked(props.item);
    }
    return (
      <Card className="card-stats">
        <CardBody style={{ display: 'flex' }}>
          <div className="RenderItemDiv">
            <div>
              <img src={props.item.uri} />
            </div>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div></div>
                <Button
                  className="btn-round"
                  color="secondary"
                  onClick={onRemoveClicked}
                  style={{ fontSize: 20, borderRadius: 0, fontWeight: 'lighter', padding: 8, marginRight: 13 }}
                >
                  REMOVE
              </Button>
              </div>
              <h2 className="RenderItemTitle">{props.item.number}</h2>
            </div>
          </div>
        </CardBody>
      </Card>

    );
  }


  return (
    <>
      <div className="content" style={{ margin: 30, marginTop: 120 }}>
        <div className="RenderItemContainer">
          <h1 style={{ textAlign: 'center', marginBottom: 60 }}>My Enquiry</h1>

          {
            items.length > 0 ?
              (<div className="enquireActionDiv">
                <div style={{ display: 'flex' }}>
                  <div style={{ display: 'flex' }}>
                    <h3 style={{ margin: 'auto' }}>Your email here :</h3>
                  </div>

                  <div style={{ display: 'flex' }}>
                    <input placeholder="xxx@xxx.com" value={emailValue} onChange={(e) => SetEmailValue(e.target.value)} style={{ fontSize: 24, borderRadius: 10, borderWidth: 1, borderColor: 'gray', margin: 'auto', minWidth: 400, textAlign: 'center', padding: 5, marginLeft: 20 }} />
                  </div>
                </div>

                <Button
                  className="btn-round"
                  color="danger"
                  onClick={onEnquire}
                  style={{ fontSize: 30, borderRadius: 6, fontWeight: 'lighter' }}
                >
                  ENQUIRE
                </Button>
              </div>) : (
                <h2 style={{ textAlign: 'center' }}>Your enquiry list is empty.</h2>
              )
          }


          {
            items.map((item, i) => {
              return <RenderItem
                item={item}
                key={i}
                _onRemoveClicked={(item) => onRemoveItemClicked(item)}
              />
            })
          }
        </div>
      </div>
    </>
  );
}