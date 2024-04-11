//AlbumForm will be used for adding a new album into the database. This must have a form heading, submit button, clear button. We need to add it to the top of AlbumList component.
import { useRef, useState } from "react";
import db from "../config/firestoreInit";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Albumform(props) {
  const titleRef = useRef(null);
  const [albumTitle, setAlbumTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    async function addAlbum() {
      try {
        //Here we will add the new album into the database.
        const docRef = await addDoc(collection(db, "albums"), {
          title: albumTitle,
          createdOn: new Date(),
        });
        toast.success("Album created successfully !");
        setAlbumTitle("");
        props.setFormHidden(true);
      } catch (err) {
        toast.error("Something went wrong, please try again!");
        console.log(
          "Something went wrong while adding a new album into database",
          err
        );
      }
    }
    addAlbum();
  }

  return (
    <div className="album-form-container">
      <div className="album-form">
        <span className="form-heading">Create an Album</span>
        {/* Form to create a new album */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="form-input"
            placeholder="Album Name"
            value={albumTitle ? albumTitle : ""}
            ref={titleRef}
            required
            onChange={(e) => {
              setAlbumTitle(e.target.value);
            }}
          />
          <button
            onClick={() => setAlbumTitle("")}
            type="button"
            className="clear-button"
          >
            Clear
          </button>
          {/* we will add the "Update" text instead of Create with conditional rendering */}
          <button type="submit" className="submit-button">
            {"Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Albumform;
