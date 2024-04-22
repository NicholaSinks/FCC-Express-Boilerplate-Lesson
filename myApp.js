require('dotenv').config()
let bodyParser = require('body-parser')

let express = require('express');
let app = express();

console.log("Hello World")

app.use("/", function middleware(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use(bodyParser.urlencoded({extended: false}), bodyParser.json());

app.post("/name", (req,res,next) => {
    const {first: firstname, last: lastname} = req.body;
    res.json({
        name: `${firstname} ${lastname}`
    });
    next();
});

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({
        time: req.time
    });
});

app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
        echo: word
    });
});

app.get("/name/", (req, res)=>{
    const {first: firstname, last: lastname} = req.query;
    res.json({
        name: `${firstname} ${lastname}`
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
    var response = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        response = response.toUpperCase();
    }
    res.json({
        "message": response
    });
});













module.exports = app;