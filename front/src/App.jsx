import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [thumbnail, setThumbnail] = useState(null);
  // const [thumbnailReact, setThumbnailReact] = useState(null);

  const handleChange = async (e) => {
    const file = e.target.files[0];

    // const reader = new FileReader();

    // reader.addEventListener("load", (event) => {
    //   setThumbnailReact(event.target.result);
    // });

    // reader.readAsDataURL(selectedFile);

    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("http://localhost:5000", formData);

    setThumbnail(response.data.data);
  };

  console.log("thumbnail => ", thumbnail);
  // console.log("thumbnailReact => ", thumbnailReact);

  return (
    <div className="App">
      <input type="file" onChange={handleChange} />
      <img
        src={"data:image/jpeg;base64," + thumbnail}
        alt=""
        with={200}
        height={200}
      />
      {/* <div>{JSON.stringify(thumbnail)}</div> */}
    </div>
  );
}

export default App;
