const createError = require("http-errors");
const express = require("express");
const port = 3000;
const path = require("path");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");

const app = express();
const indexRouter = require("./routes/index");

// view engine setup
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// router
indexRouter(app);

app.listen(port, () => {
    console.log(`Project is running at port ${port}`);
});
