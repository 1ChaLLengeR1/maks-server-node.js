const express = require("express");
const router = express.Router();
const pool = require("../../database.js");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (
        !fs.existsSync(
          `./images/${req.body.name}-${req.body.numeric}-${req.body.random_number}`
        )
      ) {
        fs.mkdirSync(
          `./images/${req.body.name}-${req.body.numeric}-${req.body.random_number}`
        );
      }
    } catch (e) {
      console.log("errror: " + e);
    }
    cb(null, `./images/${req.body.name}-${req.body.numeric}-${req.body.random_number}`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploader = multer({ storage: storage });

router.post(
  "/",
  uploader.fields([{ name: "image_project" }, { name: "images" }]),
  async (req, res) => {
    try {
      const { name, short_description, description, numeric, random_number } =
        req.body;
      const { image_project, images } = req.files;
      const id = uuidv4();

      await pool.query(
        `INSERT INTO projects(id, name, short_description, description, path_image, link_image, numeric, name_folder) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          id,
          name,
          short_description,
          description,
          image_project[0].path,
          `${process.env.LINK_SERVER}${image_project[0].path}`,
          numeric,
          `${name}-${numeric}-${random_number}`,
        ]
      );

      for (const key of images) {
        await pool.query(
          `INSERT INTO project_images(id_project, path, link) VALUES($1, $2, $3)`,
          [id, key.path, `${process.env.LINK_SERVER}${key.path}`]
        );
      }

      res.status(200).send({ succes: "Dodano projekt!" });
    } catch (error) {
      res.status(400).send({ error: "Błąd podczas dodawania projektu!" });
    }
  }
);

module.exports = router;
