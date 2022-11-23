module.exports = app => {

  const indexRouter = require("./index.routes")
  app.use("/", indexRouter)

  const authRouter = require("./auth.routes")
  app.use("/", authRouter)

  const usersRouter = require("./user.routes")
  app.use("/", usersRouter)

  const eventsRouter = require("./event.routes")
  app.use("/eventos", eventsRouter)

  const createEventsRouter = require("./create-events.routes")
  app.use("/", createEventsRouter)
}