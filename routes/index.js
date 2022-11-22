module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes")
  app.use("/", indexRouter)

  // Auth routes
  const authRouter = require("./auth.routes")
  app.use("/", authRouter)

  // Users routes
  const usersRouter = require("./user.routes")
  app.use("/", usersRouter)

  // Events routes
  const eventsRouter = require("./event.routes")
  app.use("/", eventsRouter)

  // Create Event routes
  const CreateEventsRouter = require("./create-events.routes")
  app.use("/", CreateEventsRouter)

}
