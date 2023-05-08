import React, { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col, } from "reactstrap";
import { firebaseApp } from './../Helper/firebaseHelper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import Modal from './../components/Modal';
import './../assets/css/product.css';
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
export default function Products() {

  const [step, setStep] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentCategory, setCurrentCategory] = useState();
  const [currentSubCategory, setCurrentSubCategory] = useState();
  const [currentItem, setCurrentItem] = useState();

  const [minCategoryPriority, setMinCategoryPriority] = useState(0);
  const [minSubCategoryPriority, setMinSubCategoryPriority] = useState(0);
  const [minItemPriority, setMinItemPriority] = useState(0);

  const getFirebaseCategoryData = async () => {
    setCategoryData([]);
    setIsFetching(true);
    db.collection("Category").get().then(async (querySnapshot) => {
      var tcategories = [];
      let minPriority = 0;
      querySnapshot.forEach(async (documentSnapshot) => {
        let catName = documentSnapshot.data().name;
        let catImage = documentSnapshot.data().image;
        let priority = documentSnapshot.data().priority;
        if (priority < minPriority)
          minPriority = priority;

        const url = await storage.ref(catImage).getDownloadURL();
        tcategories[tcategories.length] = {
          name: catName,
          imagename: catImage,
          uri: url,
          priority: priority
        }

        if (tcategories.length == querySnapshot.size) {
          tcategories.sort((a, b) => a.priority - b.priority);
          setMinCategoryPriority(minPriority);
          setCategoryData(tcategories);
          setIsFetching(false);
          console.log(tcategories);
        }
      });

    }).catch((error) => {
      console.log(error);
    });
  }
  const getFirebaseSubCategoryData = async (categoryName) => {
    setSubCategoryData([]);
    setIsFetching(true);
    db.collection("SubCategory").where('categoryname', '==', categoryName).get().then(async (querySnapshot) => {
      var temp = [];
      let minPriority = 0;
      if (querySnapshot.size == 0)
        setIsFetching(false);
      querySnapshot.forEach(async (documentSnapshot) => {
        let subCatName = documentSnapshot.data().subcategoryname;
        let subCatImage = documentSnapshot.data().image;
        let priority = documentSnapshot.data().priority;
        if (priority < minPriority)
          minPriority = priority;
        const url = await storage.ref(subCatImage).getDownloadURL();
        temp[temp.length] = {
          categoryname: categoryName,
          name: subCatName,
          imagename: subCatImage,
          uri: url,
          priority: priority
        }
        if (temp.length == querySnapshot.size) {
          temp.sort((a, b) => a.priority - b.priority);
          setMinSubCategoryPriority(minPriority);
          setSubCategoryData(temp);
          setIsFetching(false);
        }
      });
    })
  }
  const getFirebaseItemsData = async (item) => {
    setItemsData([]);
    setIsFetching(true);
    db.collection("Items").where('categoryname', '==', item.categoryname).where('subcategoryname', '==', item.name).get().then(async (querySnapshot) => {
      var temp = [];
      let minPriority = 0;
      if (querySnapshot.size == 0)
        setIsFetching(false);
      querySnapshot.forEach(async (documentSnapshot) => {
        let itemName = documentSnapshot.data().number;
        let itemImage = documentSnapshot.data().image;
        let itemSpec = documentSnapshot.data().specification;
        let priority = documentSnapshot.data().priority;
        if (priority < minPriority)
          minPriority = priority;
        const url = await storage.ref(itemImage).getDownloadURL();
        temp[temp.length] = {
          categoryname: item.categoryname,
          subcategoryname: item.name,
          name: itemName,
          number: itemName,
          uri: url,
          imagename: itemImage,
          specification: itemSpec,
          priority: priority
        }
        if (temp.length == querySnapshot.size) {
          temp.sort((a, b) => a.priority - b.priority);
          setMinItemPriority(minPriority);
          setItemsData(temp);
          setIsFetching(false);
        }
      });
    });
  }

  useEffect(() => {
    getFirebaseCategoryData();
  }, []);

  function RenderItem(props) {
    const onImageClicked = () => {
      props._onImageClicked(props.item);
    }
    return (
      <Col lg="3" md="6" sm="6">
        <Card className="card-stats">
          <CardBody style={{ display: 'flex' }}>
            <img
              alt="..."
              src={props.item.uri}
              onClick={() => onImageClicked()}
              style={{
                width: 250,
                height: 200,
                margin: 'auto'
              }}
            />
          </CardBody>
          <CardFooter>
            <hr />
            <h3 style={{ textAlign: 'center' }}>
              {props.item.name}
            </h3>
          </CardFooter>
        </Card>
      </Col>
      // <div style={styles.renderItemStyle}>
      //   <p style={{ marginBottom: 5, fontSize: 20, fontWeight: 'bold' }}> {props.item.name} </p>
      //   <img
      //     src={props.item.uri}
      //     style={styles.imageStyle}
      //     onClick={() => onImageClicked()}
      //   />
      // </div>
    );
  }


  const ItemClick = (item) => {
    //console.log(item);
    if (step == 0) {
      getFirebaseSubCategoryData(item.name);
      setCurrentCategory(item.name);
      setStep(1);
    } else if (step == 1) {
      getFirebaseItemsData(item);
      setCurrentSubCategory(item.name)
      setStep(2);
    } else if (step == 2) {
      console.log(item);
      setCurrentItem(item);
      setModalVisible(true);
      setStep(3);
    }
  }

  const onEnquireClick = (item) => {
    //console.log(item);
    //toast("Wow so easy !");
    alert("Added to your enquiry list.");


    let prepareEnquiry = JSON.parse(localStorage.getItem('prepareEnquiry')) || [];
    let alreadyContains = false;
    prepareEnquiry.forEach(peitem => {
      if (peitem.uri == item.uri)
        alreadyContains = true;
    })

    if (alreadyContains == false)
      prepareEnquiry.push(item);

    localStorage.setItem('prepareEnquiry', JSON.stringify(prepareEnquiry));
    console.log(JSON.parse(localStorage.getItem('prepareEnquiry')));
  }



  const onGoBackButtonClicked = () => {
    console.log("GoBack clicked");
    if (step == 1) {
      //getFirebaseCategoryData();
      setStep(0);
    } else if (step == 2) {
      //getFirebaseSubCategoryData(currentCategory);
      setStep(1);
    } else if (step == 3) {
      setStep(2);
    }
  }

  const onWhatsAppClicked = () => {
    console.log("onwhatsapp");
    let url = "https://wa.me/message/6O2NYLXDO7RED1";
    var win = window.open(url, '_blank');
    win.focus();
  }

  return (
    <>
      <div className="content" style={{ margin: 30, marginTop: 120 }}>


        <Row style={{ justifyContent: "space-between", alignItems: "center", marginLeft: 30, marginRight: 30 }}>
          {
            step != 0 ?
              (<Button
                className="btn-round"
                color="primary"
                onClick={() => onGoBackButtonClicked()}
              >
                <i className="nc-icon nc-minimal-left" style={{ padding: 10 }} />
              </Button>)
              : null
          }
          <div></div>

          <h3 style={{ marginBottom: 0, color: '#004499' }} >
            {step == 0 && "Please Select Category"}
            {step == 1 && "Please Select Sub Category"}
            {step == 2 && "Please Select Item"}
          </h3>
        </Row>

        {isFetching ?
          (
            <Row style={{ display: 'flex' }}>
              <Loader
                type="Oval"
                color="#00BFFF"
                height={200}
                width={200}
                style={{ margin: 'auto' }}
              />
            </Row>) :
          (<Row>
            {step == 0 &&
              categoryData.map((item, i) => {
                return <RenderItem
                  item={item}
                  key={i}
                  _onImageClicked={(item) => ItemClick(item)}
                />
              })
            }

            {step == 1 &&
              subCategoryData.map((item, i) => {
                return <RenderItem
                  item={item}
                  key={i}
                  _onImageClicked={(item) => ItemClick(item)}
                />
              })
            }

            {step == 2 &&
              itemsData.map((item, i) => {
                return <RenderItem
                  item={item}
                  key={i}
                  _onImageClicked={(item) => ItemClick(item)}
                />
              })
            }

            {step == 3 &&
              <Modal
                show={modalVisible}
                data={currentItem}
                onModalClose={() => setModalVisible(false)}
                onModalEnquire={(item) => onEnquireClick(item)}
                inputPlaceholder="Category Name"
              />
            }
          </Row>)
        }


        <div style={styles.WhatsAppStyle} onClick={() => onWhatsAppClicked()}>
          <img className="amazonImage" src={require("./../Images/whatsapp.png")} style = {{ width : 80, height : 80}} />
        </div>

      </div>
    </>
  );
}


const styles = {
  itemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },
  WhatsAppStyle: {
    position: 'fixed',
    bottom: 20,
    filter: 'drop-shadow(0 0 0.3rem white)'
  },
}