import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
//Add your firestore/firebase database connection here.
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
