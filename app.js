var createError = require("http-errors");
var express = require("express");
var path = require("path");
const cookieSession = require("cookie-session");
var cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
var flash = require("connect-flash");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/UserRoutes/user");
var usersRouter = require("./routes/UserRoutes/register");
var usersRouter = require("./routes/UserRoutes/login");
var adminRouter = require("./routes/AdminRoutes/admin");

var app = express();

require("dotenv").config();
var connection = process.env.MONGODB_URI;

//Database connection
mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // serverSelectionTimeoutMS:5000,
    // socketTimeoutMS: 45000,
  })
  .then(console.log("database connected"))
  .catch((error) => {
    if (error) console.log(error);
  });
const store = new MongoDBStore({
  uri: connection,
  connection: "UserSession",
});

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "avorika",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    store: store,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

app.use("/", indexRouter);
app.use("/register", require("./routes/UserRoutes/register"));
app.use("/login", require("./routes/UserRoutes/login"));
app.use("/", require("./routes/google"));
app.use("/admin", adminRouter);
app.use("/user", require("./routes/UserRoutes/user"));
app.use("/logout", require("./routes/UserRoutes/logout"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
