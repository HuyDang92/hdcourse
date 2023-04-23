const db = require("../models/db");
const modelCourse = require("../models/courseModel");

class NewsSite {
    async index(req, res) {
        const info = req.session.info;
        res.render("site/index", { infoUser: info });
    }
    async contact(req, res) {
        const info = req.session.info;
        res.render("site/contact", { infoUser: info });
    }
    async about(req, res) {
        const info = req.session.info;
        res.render("site/about", { infoUser: info });
    }
    async cart(req, res) {
        const info = req.session.info;
        res.render("site/cart", { infoUser: info });
    }
    async teachers(req, res) {
        const info = req.session.info;
        try {
            const [listTeacher] = await db.query(`SELECT * FROM teachers`);
            res.render("site/teacher", { listTeacher, infoUser: info });
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    }
    async courses(req, res) {
        const info = req.session.info;
        try {
            // Phân trang
            const currentPage = req.params.page || 1;
            const perPage = 6;
            const offset = (currentPage - 1) * perPage;
            // Lấy dữ liệu khóa học
            const [listCourse] = await db.query(`SELECT * FROM courses LIMIT ${perPage} OFFSET ${offset}`);
            // Lấy tổng số khóa học
            const [courseCount] = await db.query(`SELECT COUNT(*) AS count FROM courses`);
            const totalCount = courseCount[0].count;
            const totalPage = Math.ceil(totalCount / perPage);

            res.render("site/course", { listCourse, currentPage: currentPage, totalPage: totalPage, infoUser: info });
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    }
    async courseDetail(req, res) {
        const id = req.params.id;
        const info = req.session.info;
        res.render("site/course-detail", { id: id, infoUser: info });
    }
    async cateById(req, res) {
        const catId = req.params.id;
        const info = req.session.info;
        res.render("site/courseCate", { id: catId, infoUser: info });
    }
    async search(req, res) {
        const name = req.body.nameSearch;
        const info = req.session.info;
        const data = await modelCourse.listCourseName(name);
        res.render("site/search", { listCourse: data, infoUser: info, name: name });
    }
}
module.exports = new NewsSite();
