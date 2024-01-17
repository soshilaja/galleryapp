import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase.config";

const Storage = {
  uploadFile: (media) => {
    return new Promise(async (resolve) => {
      try {
        const mediaRef = ref(storage, `images/${media.title}`);
        uploadBytes(mediaRef, media.file).then((snapshot) => {
          resolve({ path: snapshot.metadata.fullPath, name: media.title });
        });
      } catch (error) {
        console.error(error);
      }
    });
  },
  downloadFile: (media) => {
    return new Promise(async (resolve) => {
      try {
        const mediaRef = ref(storage, media.path);
        const fileURL = await getDownloadURL(mediaRef);
        resolve(fileURL);
      } catch (error) {
        console.error(error);
      }
    });
  },
};

export default Storage;
