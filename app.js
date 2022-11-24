require("dotenv").config()
require("./db")

const express = require("express")
const app = express()

require("./config")(app)
require('./config/session.config')(app)

app.locals.appTitle = `Gold Events`
app.use((req, res, next) => {
  if (req.session.currentUser) {
    app.locals.isOnline = req.session.currentUser
    if (req.session.currentUser.role === 'ADMIN' || req.session.currentUser.role === 'EDITOR') {
      app.locals.canCreate = true
    }
  } else {
    app.locals.canCreate = false
    app.locals.isOnline = null
  }

  next()
})

require("./routes")(app)
require("./error-handling")(app)

module.exports = app