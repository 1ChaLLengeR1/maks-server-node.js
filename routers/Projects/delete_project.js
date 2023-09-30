const express = require("express");
const router = express.Router();
const pool = require("../../database.js");
const fs = require("fs");

router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;

    images_project_id = await pool.query(
      `SELECT path FROM project_images WHERE id_project = '${id}'`
    );

    if(images_project_id.rows.length===0){
      res.status(401).send({ error: "Brak id projektu!" });
      return;
    }

    for (const key of images_project_id.rows) {
      await pool.query(`DELETE FROM project_images WHERE id_project = '${id}'`);
      fs.unlinkSync(key.path);
    }

    const project_id = await pool.query(
      `SELECT path_image, name_folder FROM projects WHERE id = '${id}'`
    );

    await pool.query(`DELETE FROM projects WHERE id = '${id}'`);

    try {
      fs.unlinkSync(project_id.rows[0].path_image);
      fs.rmSync(`./images/${project_id.rows[0].name_folder}`, {
        recursive: true,
        force: true,
      });
    } catch (error) {}

    res.status(200).send({ succes: "usunięto poprawnie projekt!" });
  } catch (error) {
    res.status(401).send({ error: "Błąd podczas usuwania projektu!" });
  }
});

module.exports = router;
