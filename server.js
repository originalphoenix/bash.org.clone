var express    = require("express"),
	bodyParser = require('body-parser'),
	quotes     = require("./routes/quotes"),
	config     = require("./libs/config"),
	app        = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/quotes", quotes);

// Serve static assets
app.use(express.static("./public"));
app.use("/app", express.static("./app"));
app.use("/components", express.static("./components"));

var port = process.env.PORT || config.get("port");

app.listen(port);

console.log("Running server on port " + port + ", press ctrl + c to stop.");
