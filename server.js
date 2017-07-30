const express = require("express")
const mustacheExpress = require("mustache-express")
const expressValidator = require("express-validator")
const bodyParser = require("body-parser")
const app = express()

app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.get("/", (request, response) => {
  console.log("hello from home")
  response.render("home")
})
app.get("/login", (request, response) => {
  console.log("you are in login")
  response.render("login")
})
app.post("/login", (request, response) => {
  response.redirect("/")
})

const authenticate = (request, response, next) => {
  console.log("autenticacion")
  if (request.body.password === " " && request.body.name === " ") {
    next()
  } else {
    response.redirect("/")
  }
}

app.use(authenticate)

app.get("/login", (request, response) => {
  console.log("logging")
  response.render("login")
})

app.post("/login", (request, response) => {
  console.log("Whats happening", request.body)

  request.checkBody("name", "we need your name").notEmpty()
  request.checkBody("password", "we need your password").notEmpty()
  response.render("login")
})

//request.checkBody("loginName", "You must submit your name").notEmpty()
//request.checkBody("email", "You must submit your email")

//const errors = request.validationErros()
//if (errors) {
//  const data = {
//    errors: errors
//   }
//   response.render("home", data)
// } else {
//   response.render("login", {
//     loginName: request.body.loginName,
//     email: reuest.body.email
//   })
// }

app.listen(3000, () => {
  console.log("Funciona")
})
