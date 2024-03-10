// 10) сутність "список розсилань
// та передплатників": тема листа, зміст листа, дата відправлення, імена й адреси
// передплатників.

// email {theme, description, sendDate, to: {name, address}}

var createError = require("http-errors");
var express = require("express");

var indexRouter = require("./routes/index");

const mongoose = require("mongoose");

// Connection URI
const uri =
  "mongodb+srv://kirikslaw:xgGOOgCxlyrA47ZE@cluster0.rbrlxaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => console.log("DB CONNECTED"))
  .catch((e) => console.log("DB ERROR", e));

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
