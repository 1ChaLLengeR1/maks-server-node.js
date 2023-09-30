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

router.put("/", uploader.array("image_project"), async (req, res) => {
  try {
    const { id, name, short_description, description, numeric } = req.body;

    const single_project_id = await pool.query(
      `SELECT * FROM projects WHERE id = '${id}'`
    );

    if (req.files.length === 0) {
      await pool.query(
        `UPDATE projects SET name = '${name}', short_description='${short_description}', description='${description}', numeric='${numeric}' WHERE id = '${id}'`
      );
    } else {
      try {
        fs.rmSync(single_project_id.rows[0].path_image, {
          recursive: true,
          force: true,
        });
      } catch (error) {}

      await pool.query(
        `UPDATE projects SET name = '${name}', short_description='${short_description}', description='${description}', numeric='${numeric}', path_image='${req.files[0].path}', link_image='${process.env.LINK_SERVER}${req.files[0].path}' WHERE id = '${id}'`
      );
    }

    res.status(200).send({ succes: "Poprawnie zaktualizowano projekt!" });
  } catch (error) {
    res.status(400).send({ error: "Błąd podczas aktualizacji projektu!" });
  }
});

module.exports = router;
