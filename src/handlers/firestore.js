import {
  setDoc,
  doc,
  serverTimestamp,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../lib/firebase.config";

const Firestore = {
  readDocs: (...args) => {
    const [collection_name] = args;
    let docs = [];
    const ref = collection(db, "imagestock");
    return new Promise(async (resolve) => {
      try {
        const snapsshots = await getDocs(ref);
        snapsshots.forEach((doc) => {
          const d = { ...doc.data(), id:doc.id };
          docs.push(d);
        });
        resolve(docs);
      } catch (error) {
        console.log(error);
      }
    });
  },
  writeDoc: (...args) => {
    const [inputs, collection_name] = args;
    return new Promise(async (resolve) => {
      const randomIndex = Math.floor(Math.random() * 1000000000);
      try {
        const docRef = doc(db, "imagestock", `${randomIndex}`);
        await setDoc(docRef, {
          title: inputs.title,
          path: inputs.path,
          createdAt: serverTimestamp(),
          user: inputs.user,
        });
        resolve("new doc successfully inserted");
      } catch (error) {}
    });
  },
};

export default Firestore;
