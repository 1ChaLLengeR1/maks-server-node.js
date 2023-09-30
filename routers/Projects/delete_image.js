const express = require("express");
const router = express.Router();
const pool = require("../../database.js");
const fs = require("fs");

router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    const image_delete_id = await pool.query(
      `SELECT * FROM project_images WHERE id = '${id}'`
    );

    try {
      fs.rmSync(image_delete_id.rows[0].path, {
        recursive: true,
        force: true,
      });
    } catch (error) {}

    await pool.query(`DELETE FROM project_images WHERE id = '${id}'`);

    res.status(200).send({ succes: "Poprawnie usunięto zdjęcie!" });
  } catch (error) {
    res.status(400).send({ error: "Błąd podczas usuwania zdjęcia!" });
  }
});

module.exports = router;
