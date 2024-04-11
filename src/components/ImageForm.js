//In this component we will create a form that will be used to add images to an existing album, also this form will be used to edit an existing image. ON clicking the edit button on the image we should be able to edit the image link and the title, these details should automatically be fetched and displayed in the image add form for us to do edits.

import { addDoc, collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../config/firestoreInit";
import { toast } from "react-toastify";

function ImageForm(props) {
  const [imageTitle, setImageTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  //Pre populate the form fields in case of updation state being true.
  useEffect(() => {
    async function getTheDoc() {
      if (props.isUpdate) {
        //Fetch the image details from the firestore and  prepopulate the fields.
        const imageRef = doc(db, "images", props.updateId);
        const document = await getDoc(imageRef);
        setImageTitle(document.data().title);
        setImageUrl(document.data().url);
      }
    }
    getTheDoc();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    let updateImage, addImage;
    if (props.isUpdate) {
      updateImage = async () => {
        try {
          const imageRef = doc(db, "images", props.updateId);
          await updateDoc(imageRef, {
            title: imageTitle,
            url: imageUrl,
          });
          setImageTitle("");
          setImageUrl("");
          toast.success("Image updated successfully !");
          //For making the udpate state back to false after submitting the form.
          props.setIsUpdate(false);
          props.onImageAdded();
          props.setFormHidden(true);
        } catch (err) {
          toast.error("Something went wrong, please try again!");
          console.log(
            "Something went wrong while adding a new image into database",
            err
          );
        }
      };
    } else {
      addImage = async () => {
        try {
          //Here we will add the new image into the album.
          const docRef = await addDoc(collection(db, "images"), {
            title: imageTitle,
            albumId: props.albumId,
            url: imageUrl,
            createdOn: new Date(),
          });
          setImageTitle("");
          setImageUrl("");
          toast.success("Image added successfully !");
          props.onImageAdded();
          props.setFormHidden(true);
        } catch (err) {
          toast.error("Something went wrong, please try again!");
          console.log(
            "Something went wrong while adding a new image into database",
            err
          );
        }
      };
    }
    //Calling the updateImage function if updation  is required otherwise calling the addImage function.
    props.isUpdate ? updateImage() : addImage();
  }

  return (
    <div className="image-form-container album-form-container">
      <div className="album-form">
        <span className="form-heading">
          {props.isUpdate ? `${"Edit Image"}` : `${"Add an Image"}`}
        </span>
        {/* Form to create a new image */}
        <form onSubmit={(e) => handleSubmit(e)} className="">
          <input
            className="image-title-input form-input"
            placeholder="Image Title"
            value={imageTitle ? imageTitle : ""}
            required
            onChange={(e) => {
              setImageTitle(e.target.value);
            }}
          />
          <input
            className="image-url form-input"
            placeholder="Image URL"
            required
            value={imageUrl ? imageUrl : ""}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />
          <button
            type="button"
            className="clear-button"
            onClick={() => {
              setImageTitle("");
              setImageUrl("");
            }}
          >
            Clear
          </button>
          {/* we will add the "Update" text instead of Add with conditional rendering */}
          <button type="submit" className="submit-button">
            {props.isUpdate ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ImageForm;
