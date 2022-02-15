const express = require("express");
const cors = require("cors");
const formidable = require("formidable");
const fs = require("fs");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    // const extension = files.file.originalFilename.split(".").pop();

    fs.readFile(files.file.filepath, "base64", (error, data) => {
      console.log(files.file);
      if (error) console.log(error);

      return res.json({ data });
    });
  });
});

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "./public");
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.originalname);
//   },
// });
// const upload = multer({ storage }).single("file");

// app.post("/", upload, async function (req, res) {
//   fs.readFile(req.file.path, "utf8", (_, data) => {
//     return res.json({ data: data });
//   });

//   console.log(req.file);

//   // fs.unlink(req.file.path, (err) => {
//   //   console.log(err);
//   // });
// });

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
