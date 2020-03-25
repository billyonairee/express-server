var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", "./views_file");
app.set("view engine", "pug");
app.locals.pretty = true;

app.get("/topic/new", (req, res) => {
	fs.readdir("data", (err, files) => {
		if (err) {
			console.log(err);
			res.status(500).send("Internal Server Error");
		}
		res.render("new", { topics: files });
	});
});

app.get(["/topic", "/topic/:id"], (req, res) => {
	fs.readdir("data", (err, files) => {
		if (err) {
			console.log(err);
			res.status(500).send("Internal Server Error");
		}
		var id = req.params.id;
		if (id) {
			fs.readFile("data/" + id, "utf8", (err, data) => {
				if (err) {
					console.log(err);
					res.status(500).send("Internal Server Error");
				}
				res.render("view", {
					topics: files,
					title: id,
					description: data
				});
			});
		} else {
			res.render("view", {
				topics: files,
				title: "Welcome",
				description: "Hello, JavaScript for server"
			});
		}
	});
});

app.post("/topic", (req, res) => {
	var title = req.body.title;
	var description = req.body.description;
	fs.writeFile("data/" + title, description, err => {
		if (err) {
			console.log(err);
			res.status(500).send("Internal Server Error");
		}
		res.redirect("/topic/" + title);
	});
});

app.listen(3000, () => {
	console.log("Connected, 3000 port!");
});
