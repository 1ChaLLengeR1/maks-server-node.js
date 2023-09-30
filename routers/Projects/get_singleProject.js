const express = require("express");
const router = express.Router();
const pool = require("../../database.js");

router.post("/", async (req, res) => {
  try {
    const { id } = req.body;
    const singleProject_id = await pool.query(
      `SELECT * FROM projects WHERE id = '${id}'`
    );

    const images_project_id = await pool.query(`SELECT * FROM project_images WHERE id_project = '${id}'`)

    const object_singleProject = {
        id: singleProject_id.rows[0].id,
        name: singleProject_id.rows[0].name,
        description: singleProject_id.rows[0].description,
        short_description: singleProject_id.rows[0].short_description,
        numeric: singleProject_id.rows[0].numeric,
        name_folder: singleProject_id.rows[0].name_folder,
        image_project: singleProject_id.rows[0].link_image,
        images_project: images_project_id.rows
    }

    res.status(200).send(object_singleProject);
  } catch (error) {
    res.status(401).send({ error: "Błąd pobierania singleProjektu!" });
  }
});

module.exports = router;
