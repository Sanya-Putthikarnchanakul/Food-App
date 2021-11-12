//#region import

require('dotenv').config();
const path = require("path");

const express = require("express");
const app = express();
app.set("view engine", "ejs");

const MONGODB_URI = "mongodb://localhost:27017/food";
//const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.58bzs.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

//#endregion

//#region middleware

/* serve static */
app.use(express.static(path.join(__dirname, "public")));

/* url encoded form body */
app.use(express.urlencoded({ extended: false }));

/* session */
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
app.use(
	session({
		cookie: { maxAge: 1000 * 60 * 30 },
		secret: "Sanya220931",
		resave: false,
		saveUninitialized: false,
		store: new MongoDBStore({ uri: MONGODB_URI, collection: "sessions" }),
	})
);

/* csrf token */
const csrf = require("csurf");
app.use(csrf());
app.use((req, res, next) => {
	res.locals.csrfToken = req.csrfToken();
	next();
});

//#endregion

//#region routes

const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");

app.use("/auth", authRoute);
app.use(indexRoute);
app.use(async (err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') return res.redirect('/auth/login');

	res.render("error", {
		pageTitle: 'Error'
	});
});

//#endregion

//#region start server

const mongoose = require("mongoose");

const { getCurrentDateTimeDisplay } = require("./utils/dateTimeUtil");

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(port, () => {
      console.log(
        `Server Start on Port = ${port} @ ${getCurrentDateTimeDisplay(
          "yyyy-mm-dd hh:mm"
        )}`
      );
    });
  } catch (err) {
    console.log(`[app.startServer] error => ${err}`);
  }
};

startServer();

//#endregion
