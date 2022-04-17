import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import path from "path";

// front-end layout library
import expressLayouts from "express-ejs-layouts";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "src")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

app.set("layout extractScripts", true);
app.set("layout", "./layouts/layout");

// create routes
import routes from "./routes/index.js";
app.use("/", routes);

// start server
app.listen(process.env.PORT, () => {
  console.log(`server started at : http://localhost:${process.env.PORT}`);
});
