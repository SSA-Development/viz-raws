var express = require("express");
var db = require("../database/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
var StreamZip = require("node-stream-zip");

var router = express.Router();

const upload = multer({
  dest: path.join(__dirname, "./temp"),
});

router.post("/upload", upload.single("file"), async (req, res) => {
  const tempPath = req.file.path;
  const series = req.body.series.toLowerCase();
  const chapter = req.body.chapter;
  const type = req.body.type.toLowerCase();
  const ch_name = req.body.ch_name;
  const d_name = req.body.d_name;

  const targetPath = path.join(
    __dirname,
    `../series/${series}/${chapter}/${type}`
  );

  if (path.extname(req.file.originalname).toLowerCase() === ".zip") {
    fs.mkdir(targetPath, { recursive: true }, (err) => { 
      if (err) { 
        console.error(err); 
      }
    });

    const zip = new StreamZip.async({
      file: tempPath,
    });

    await zip.extract(null, targetPath);

    const pages = await zip.entriesCount;
    const query = `INSERT INTO ${type} (d_name, s_name, name, chapter, pages, path) VALUES ('${d_name}', '${series}', '${ch_name}', ${chapter}, ${pages}, '${targetPath}')`;

    db.exec(query);
  }
  else {
    fs.unlink(tempPath, (err) => {
      if (err) {
        console.log(err)
      }
      res.status(403).contentType("text/plain").end("Upload a .zip file.");
    });
  }
  res.status(200).contentType("text/plain").end("File uploaded!");
});

router.post("/create", upload.single("file"), async (req, res) => {
  const tempPath = req.file.path;
  const series = req.body.series.toLowerCase();
  const name = req.body.name;
  const date = req.body.date;
  const author = req.body.author;
  const genre = req.body.genre;
  const status = req.body.status;
  
  console.log(__dirname)
  const dirPath = path.join(
    __dirname,
    `../series/${series}`
  );

  const targetPath = path.join(
    dirPath,
    `/image.png`
  )

  fs.mkdir(dirPath, { recursive: true }, (err) => { 
    if (err) { 
      console.error(err); 
    }
  });

  fs.rename(tempPath, targetPath, err => {
    if (err){
      console.log(err);
    }
  });

  const query = `INSERT INTO series (img, name, f_name, date, author, genre, status) VALUES ('${targetPath}', '${name}', '${series}', '${date}', '${author}', '${genre}', '${status}')`;

  console.log(query);
  
  db.exec(query);

  res.status(200).contentType("text/plain").end("File uploaded!");
});



module.exports = router;