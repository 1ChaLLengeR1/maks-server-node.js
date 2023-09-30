const express = require("express");
const router = express.Router();
const pool = require("../../database.js");

router.get("/", async (req, res) => {
  try {
    const all_projects = await pool.query("SELECT * FROM projects");

    const projects_array_objects = [];
    for (const key of all_projects.rows) {
      const obj_project = {
        id: key.id,
        name: key.name,
        short_description: key.short_description,
        link_image: key.link_image,
        numeric: key.numeric,
      };
      projects_array_objects.push(obj_project);
    }

    res.status(200).send(projects_array_objects);
  } catch (error) {
    res.status(401).send({ error: "Błąd pobierania projektów!" });
  }
});

module.exports = router;
