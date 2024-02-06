import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { getUserId } from "../util/auth";

export default function HomePage() {
  const [image, setImg] = useState<File>();

  const uplodeImage = () => {
    if (!image) {
      return;
    }
    const uid = getUserId();
    const imageRef = ref(storage, `/images/${uid}/${image.name}`);
    uploadBytes(imageRef, image)
      .then(() => {
        alert("image uploded");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className="home">
      <h1>Home Page</h1>
      <div>
        <input
          onChange={(event) => {
            setImg(event.target.files![0]);
          }}
          type="file"
        />
        <button onClick={uplodeImage}>uplode</button>
      </div>
    </div>
  );
}
