/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
var express = require("express");
var mongoose = require("mongoose");
var morgan = require("morgan");
var path = require("path");
var cors = require("cors");
var history = require("connect-history-api-fallback");
var bodyParser = require("body-parser");
const post_routes = require("./routes/post");
//const comments_routes = require("./routes/comment");

//calling the router
var router = express.Router();

// Variables
var mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1/forumApplicationDB"; 
var port = process.env.PORT || 3000;


// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function(err) {
	if (err) {
		console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
		console.error(err.stack);
		process.exit(1);
	}
	console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

mongoose.Promise = global.Promise;

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// HTTP request logger
app.use(morgan("dev"));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options("*", cors());
app.use(cors());

//Using the routes
app.use("/api/posts", post_routes);
//app.use("/api/comments", comments_routes);

// Import routes
app.get("/api", function (req, res) {
	res.json({ message: "Welcome to your forum application!" });
});
  
// Catch all non-error handler for api (i.e., 404 Not Found)
app.use("/api/*", function (req, res) {
	res.status(404).json({ "message": "Not Found" });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + "/..");
var client = path.join(root, "client", "dist");
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get("env");
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
	console.error(err.stack);
	var err_res = {
		"message": err.message,
		"error": {}
	};
	if (env === "development") {
		// Return sensitive stack trace only in dev mode
		err_res["error"] = err.stack;
	}
	res.status(err.status || 500);
	res.json(err_res);
});

app.listen(port, function(err) {
	if (err) throw err;
	console.log(`Express server listening on port ${port}, in ${env} mode`);
	console.log(`Backend: http://localhost:${port}/api/`);
	console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
