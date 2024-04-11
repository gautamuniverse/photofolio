import { useEffect, useState } from "react";
import db from "../config/firestoreInit.js";
import { toast } from "react-toastify";
import ImageForm from "./ImageForm";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import backImg from "../images/back.png";
import default_img from "../images/default_img.jpg";
import trash_bin from "../images/trash-bin.png";
import edit from "../images/edit.png";
import Carousel from "./Carousel.js";
import ReactSpinnerMaterial from "react-spinner-material";

function Imageslist(props) {
  //We will be storing all the images for the current selected album in the images state.
  const [images, setImages] = useState([]);
  const [formHidden, setFormHidden] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  const refreshParent = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  //In the initial render we will fetch all the images that are there in the firebase.
  useEffect(() => {
    async function fetchImages() {
      try {
        const imagesRef = collection(db, "images");
        const queryResult = query(
          imagesRef,
          where("albumId", "==", props.albumDetails.id)
        );
        const querySnapshot = await getDocs(queryResult);
        if (!querySnapshot.empty) {
          let imagesArray = [];
          querySnapshot.forEach((doc) => {
            imagesArray.push({ data: doc.data(), id: doc.id });
          });
          setImages(imagesArray);
        }
      } catch (err) {
        toast.error("Error fetching images");
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    }
    fetchImages();
  }, [props.albumDetails.id, refreshKey, images]);

  //Handle the back button
  function handleBackButton() {
    const newStack = props.navigationStack;
    newStack.pop();
    props.setNavigationStack(newStack);
    props.setRefreshKey((prevKey) => prevKey + 1); //using a custom refresh state to make the parent component refresh on the navigationStack state change.
  }

  function handleDeletion(id) {
    if (window.confirm("Are you sure you want to delete this image?")) {
      deleteImageHandler(id);
    } else return;
  }

  async function deleteImageHandler(id) {
    //Delete the image from the firestore database, collection name "images"
    try {
      const delResult = await deleteDoc(doc(db, "images", id));
      toast.success("Image deleted successfully!");
      // Update the images state by filtering out the deleted image
      setImages((prevImages) => prevImages.filter((img) => img.id !== id));
    } catch (err) {
      console.log("Error deleting document: ", err);
      toast.error("Error deleting Album");
    }
  }

  function handleUpdation(id) {
    setFormHidden(false); //making the form visible for editing.
    setIsUpdate(true); //Setting the update condition to true
    setUpdateId(id); //Set the current ID of the Image being updated
  }

  function handleCarousel(index) {
    setCarouselIndex(index);
    setCarouselVisible(true);
  }

  return (
    <div className="images-container albums-container">
      <div className="back-button-container" onClick={() => handleBackButton()}>
        <img src={backImg} className="back-img" />
      </div>
      {carouselVisible ? (
        <Carousel
          index={carouselIndex}
          imagesArray={images}
          setCarouselVisible={setCarouselVisible}
        />
      ) : null}

      {formHidden ? null : (
        <ImageForm
          albumId={props.albumDetails.id}
          onImageAdded={refreshParent}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          updateId={updateId}
          setFormHidden={setFormHidden}
        />
      )}
      <div className="album-header">
        <p>Images in {props.albumDetails.title}</p>
        {formHidden ? (
          <button
            onClick={() => setFormHidden(!formHidden)}
            className="add-album-btn"
          >
            Add Image
          </button>
        ) : (
          <button onClick={() => setFormHidden(!formHidden)} className="cancel">
            Cancel
          </button>
        )}
      </div>
      <div className="album-cards-container">
        {/* If loading is true, show the spinner */}
        {loading ? (
          <div className="loading-spinner">
            <ReactSpinnerMaterial size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
          </div>
        ) : (
          /*If the images array is not empty then loop through each image and display it*/
          images.length !== 0 ? (
            images.map((img, index) => (
              <div
                className="image-card"
                key={img.id}
                onClick={() => handleCarousel(index)}
              >
                <div className="edit-delete-buttons">
                  <img
                    className="edit"
                    id="edit-button"
                    alt="edit"
                    src={edit}
                    onClick={(e) => {
                      handleUpdation(img.id);
                      e.stopPropagation(); //To stop the propagation of click event to the parent, we don't want the carousel displaying when we click on the edit or delete button.
                    }}
                  />
                  <img
                    className="delete"
                    id="delete-button"
                    alt="delete"
                    src={trash_bin}
                    onClick={(e) => {
                      handleDeletion(img.id);
                      e.stopPropagation();
                    }}
                  />
                </div>
                <img
                  className="image-list-img"
                  src={img.data.url}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = default_img;
                  }}
                  alt={img.data.title}
                  key={index}
                />
                <p className="image-title">{img.data.title}</p>
              </div>
            ))
          ) : (
            <h2 className="no-images-found">No images found, add some!</h2>
          )
        )}
      </div>
    </div>
  );
}

export default Imageslist;
