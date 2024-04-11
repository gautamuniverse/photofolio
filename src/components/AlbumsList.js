import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import db from "../config/firestoreInit";
import albumPhoto from "../images/photos.png";
import Albumform from "./AlbumForm";
import trash_bin from "../images/trash-bin.png";
import ReactSpinnerMaterial from "react-spinner-material";

function Albumslist(props) {
  const [albums, setAlbums] = useState([]);
  const [formHidden, setFormHidden] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "albums"),
      (querySnapshot) => {
        const fetchedAlbums = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlbums(fetchedAlbums);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        toast.error("Error Fetching Albums");
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [albums, formHidden]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <ReactSpinnerMaterial
          size={120}
          spinnerColor={"#333"}
          spinnerWidth={2}
          visible={true}
        />
      </div>
    );
  }

  function handleAlbumClick(title, id) {
    props.setNavigationStack([...props.navigationStack, "images"]);
    props.setAlbumDetails({
      title,
      id,
    });
  }

  function handleDeletion(id) {
    if (window.confirm("Are you sure you want to delete this Album?")) {
      deleteAlbumHandler(id);
    } else return;
  }

  async function deleteAlbumHandler(id) {
    //Delete the image from the firestore database, collection name "images"
    try {
      const delResult = await deleteDoc(doc(db, "albums", id));
      toast.success("Album deleted successfully!");
    } catch (err) {
      console.log("Error deleting document: ", err);
      toast.error("Error deleting Album");
    }
  }

  return (
    <div className="albums-container">
      {formHidden ? null : <Albumform setFormHidden={setFormHidden} />}
      <div className="album-header">
        <p>Your Albums</p>
        {formHidden ? (
          <button
            onClick={() => setFormHidden(!formHidden)}
            className="add-album-btn"
          >
            Add Album
          </button>
        ) : (
          <button onClick={() => setFormHidden(!formHidden)} className="cancel">
            Cancel
          </button>
        )}
      </div>
      <div className="album-cards-container">
        {albums.length !== 0 ? (
          albums.map((album) => (
            // I am using image-card class to use the common styling
            <div className="album-card" key={album.id}>
              <div className="edit-delete-buttons">
                <img
                  className="delete"
                  alt="delete"
                  src={trash_bin}
                  onClick={() => handleDeletion(album.id)}
                />
              </div>
              <div
                key={album.id}
                className="album"
                onClick={() => handleAlbumClick(album.title, album.id)}
              >
                <img src={albumPhoto} className="album-photo" />
                <p className="album-title">{album.title}</p>
              </div>
            </div>
          ))
        ) : (
          <h1 className="no-albums-found">No albums found, add some!</h1>
        )}
      </div>
    </div>
  );
}

export default Albumslist;
