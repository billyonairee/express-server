var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.locals.pretty = true;
app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/form", (req, res) => {
	res.render("form");
});

app.get("/form_receiver", (req, res) => {
	var title = req.query.title;
	var description = req.query.description;

	res.send(title + " " + description);
});

app.post("/form_receiver", (req, res) => {
	var title = req.body.title;
	var description = req.body.description;

	res.send(title + " " + description);
});

app.get("/topic/:id", (req, res) => {
	var topics = ["Javascript is ...", "Nodejs is ...", "Express is ..."];

	var output = `
        <a href='/topic/0'>JavaScript</a><br>
        <a href='/topic/1'>Nodejs</a><br>
        <a href='/topic/2'>Express</a><br><br>
        <h1>${topics[req.params.id]}</h1>
    `;
	res.send(output);
});

app.get("/topic/:id/:mode", (req, res) => {
	res.send(req.params.id + "," + req.params.mode);
});

app.get("/template", (req, res) => {
	res.render("temp", { time: Date(), title: "Hello Template & Pug" });
});
app.get("/", (req, res) => {
	res.send("Welcome to home page");
});

app.get("/dynamic", (req, res) => {
	var list = "";
	for (var i = 0; i < 5; i++) {
		list = list + "<li>Coding</li>";
	}
	var time = Date();
	var output = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">    
        <title>Document</title>
    </head>

    <body>
        Hello, Dynamic!
        <ul>
        ${list}
        </ul>
        ${time}
    </body>

    </html>`;
	res.send(output);
});
app.get("/route", (req, res) => {
	res.send("Hello Router, <img src='/route.png'> ");
});

app.get("/login", (req, res) => {
	res.send("Login Please");
});

app.listen(3000, () => {
	console.log("Connected 3000 port!");
});
