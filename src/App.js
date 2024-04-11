import { useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import db from "./config/firestoreInit";
import Albumslist from "./components/AlbumsList";
import Imageslist from "./components/ImagesList";
import { ToastContainer } from "react-toastify";

function App() {
  const [navigationStack, setNavigationStack] = useState(["home"]);
  const [albumDetails, setAlbumDetails] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <Navbar />
      <ToastContainer />
      {navigationStack[navigationStack.length - 1] === "home" ? (
        <Albumslist
          navigationStack={navigationStack}
          setNavigationStack={setNavigationStack}
          setAlbumDetails={setAlbumDetails}
        />
      ) : (
        <Imageslist
          albumDetails={albumDetails}
          setAlbumDetails={setAlbumDetails}
          setNavigationStack={setNavigationStack}
          navigationStack={navigationStack}
          setRefreshKey={setRefreshKey}
          refreshKey={refreshKey}
        />
      )}
    </>
  );
}

export default App;
