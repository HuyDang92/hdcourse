const siteRouter = require("./site");
const userRouter = require("./user");
const adminRouter = require("./admin");
const cateRouter = require("./restful/categories");
const courseRouter = require("./restful/courses");
const teacherRouter = require("./restful/teachers");
const usersRouter = require("./restful/users");
const session = require("express-session");

function route(app) {
    /* GET home page. */
    app.use(
        session({
            secret: "abcd",
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: 60000 },
        })
    );
    app.use("/api/users", usersRouter);
    app.use("/api/teachers", teacherRouter);
    app.use("/api/courses", courseRouter);
    app.use("/api/categories", cateRouter);
    app.use("/admin", adminRouter);
    app.use("/user", userRouter);
    app.use("/", siteRouter);
}

module.exports = route;
