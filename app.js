var express = require("express"),
    parser  = require("body-parser"),
    fs      = require("fs"),
    sgMail  = require("@sendgrid/mail");

var app = express(),
    key = "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";

app.use(parser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
   res.render("home", {header: ""});
});

app.get("/projects", function(req, res) {
   res.render("projects", {header: "black"});
});

app.get("/contacts", function(req, res) {
   res.render("contacts", {header: "black"});
});

app.get("/almaty", function(req, res) {
   res.render("almaty", {header: ""});
});

app.post("/subscribe", function(req, res) {
   
   if (!req.body.email) { return res.redirect('back'); }
   
    var file = 'email_list.txt';
    var text = req.body.email + '\r\n';
    fs.appendFile(file, text, function (err) {
        if (err) return console.log(err);
        console.log('new subscriber: ' + text);
    });

   res.redirect('back');
});

app.post("/message", function(req, res) {
   var x = req.body;
   
   if (!x.name) { return res.send(JSON.stringify({error: 1})); }
   if (!x.email) { return res.send(JSON.stringify({error: 2})); }
   if (!x.message) { return res.send(JSON.stringify({error: 3})); }
   
   sgMail.setApiKey(key);
   const msg = {
      to: req.body.email,
      from: 'inbox@mangi.kz',
      subject: x.inquiry + ' на Mangi.kz',
      html: 'Имя: ' + x.name + '<br>Email: ' + x.email + '<br>Компания: ' + x.company + '<br>Телефон: ' + x.phone + '<br>Город: ' + x.city + '<br>Как узнали о нас: ' + x.discovered + '<br>Сообщение: ' + x.message,
   };
   sgMail.send(msg);
   
   res.send(JSON.stringify({error: 0}));
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server has been stated!"); 
});