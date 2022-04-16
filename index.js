require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "src")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

app.set("layout extractScripts", true);
app.set("layout", "./layouts/layout");

app.use("/", require("./routes"));

app.listen(process.env.PORT, () => {
  console.log(`server started at : http://localhost:${process.env.PORT}`);
});
