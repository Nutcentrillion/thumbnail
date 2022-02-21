import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("http://localhost:5000", formData);

    setThumbnail(response.data.data);
  };

  console.log("thumbnail => ", thumbnail);

  return (
    <div className="App">
      <input type="file" onChange={handleChange} />
      <img
        src={`data:image/jpeg;base64,${thumbnail}`}
        with={300}
        height={300}
        alt="Thumbnail"
      />
    </div>
  );
}

export default App;
