const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
// app.use(fileUpload()); ===> req.files

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage }).single("file");

app.post("/", upload, async function (req, res) {
  const formData = new FormData();

  formData.append(
    "file",
    fs.createReadStream(
      path.join(process.cwd(), `./public/${req.file.originalname}`)
    )
  );

  const response = await axios.post(
    "http://localhost:8000/preview/1024x1024",
    formData,
    {
      headers: formData.getHeaders(),
      responseType: "arraybuffer",
    }
  );

  let base64ImageString = Buffer.from(response.data, "binary").toString(
    "base64"
  );

  res.json({ data: base64ImageString });

  fs.unlink(req.file.path, (err) => {
    console.log(err);
  });
});

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
