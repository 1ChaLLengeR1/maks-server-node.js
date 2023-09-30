const express = require("express");
const http = require("http");
const port = 3000;
const app = express();
const cors = require("cors");
const server = http.createServer(app);
const dotenv = require("dotenv");
const { authentificationTokens } = require("./JWT/authorizationTokens");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static("images"));

const mailer = require("./routers/main-send/mailer.js");
const authentification = require("./routers/authentification/authentification.js");
const refreshToken = require("./JWT/refreshToken.js");

//require AboutMe
const AboutMeGET = require("./routers/options-panel/AboutMe/AboutMe.js");
const AboutMePOST = require("./routers/options-panel/AboutMe/AboutMeEdit.js");

//require Projects
const get_projects = require("./routers/Projects/get_projects.js");
const get_singleProject = require("./routers/Projects/get_singleProject.js");
const add_project = require("./routers/Projects/add_project.js");
const delete_project = require("./routers/Projects/delete_project.js");
const delete_image = require("./routers/Projects/delete_image.js");
const add_images_project = require("./routers/Projects/add_images_project.js");
const edit_project = require("./routers/Projects/edit_project.js");

//request OptionsPanel AboutMe
app.use("/AboutMe", AboutMeGET);
app.use("/AboutMeEdit", authentificationTokens, AboutMePOST);

//request Projects
app.use("/routers/projects/add_project", authentificationTokens, add_project);
app.use(
  "/routers/projects/delete_project",
  authentificationTokens,
  delete_project
);
app.use("/routers/projects/get_projects", get_projects);
app.use("/routers/projects/get_singleProject", get_singleProject);
app.use("/routers/projects/delete_image", authentificationTokens, delete_image);
app.use(
  "/routers/projects/add_images_project",
  authentificationTokens,
  add_images_project
);
app.use("/routers/project/edit_project", authentificationTokens, edit_project);

//request Mailer
app.use("/mailer", mailer);

//request authentification
app.use("/login", authentification);
app.use("/refreshToken", refreshToken);
// app.use("/test", authentificationTokens, testRouter);

server.listen(port, (err) => {
  try {
    console.log("Server wystartował!");
  } catch (e) {
    console.log("Error: " + e);
  }
});
