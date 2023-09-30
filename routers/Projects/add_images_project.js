const express = require("express");
const router = express.Router();
const pool = require("../../database.js");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (!fs.existsSync(`./images/${req.body.name_folder}`)) {
        fs.mkdirSync(`./images/${req.body.name_folder}`);
      }
    } catch (e) {
      console.log("errror: " + e);
    }
    cb(null, `./images/${req.body.name_folder}`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploader = multer({ storage: storage });

router.post("/", uploader.array("images"), async (req, res) => {
  try {
    const { id_project } = req.body;

    for (const image of req.files) {
      await pool.query(
        `INSERT INTO project_images(id_project, path, link) VALUES($1, $2, $3)`,
        [id_project, image.path, `${process.env.LINK_SERVER}${image.path}`]
      );
    }

    res.status(200).send({ succes: "Poprawnie dodano zdjęcia do projektu!" });
  } catch (error) {
    res
      .status(400)
      .send({ error: "Błąd podczas dodawania zdjęć do projektu!" });
  }
});

module.exports = router;
