const db = require("./db");
exports.list = async () => {
    const [listCourse] = await db.query("SELECT * FROM courses");
    return listCourse;
};

exports.readOne = async (id) => {
    const [listCourse] = await db.query(`SELECT * FROM courses WHERE id = ${id}`);
    return listCourse[0];
};

exports.create = async (data) => {
    const [listCourse] = await db.query(`INSERT INTO courses SET ?`, data);
    return listCourse;
};
exports.update = async (data, id) => {
    const [listCourse] = await db.query(`UPDATE courses  SET ? WHERE id = ?`, [data, id]);
    return listCourse;
};
exports.delCourse = async (id) => {
    const [listCourse] = await db.query(`DELETE FROM courses WHERE id = ${id}`);
    return listCourse;
};
exports.listRoute = async (id) => {
    const [listRoute] = await db.query(`SELECT * FROM course_detail WHERE id_course = ${id}`);
    return listRoute;
};
exports.listCourseCat = async (id) => {
    const [listCourse] = await db.query(`SELECT * FROM courses WHERE id_category = ${id}`);
    return listCourse;
};
exports.listCourseTopView = async () => {
    const [listCourse] = await db.query(`SELECT * FROM courses ORDER BY views DESC LIMIT 3`);
    return listCourse;
};
exports.listCourseNew = async () => {
    const [listCourse] = await db.query(`SELECT * FROM courses ORDER BY currentUpdate DESC LIMIT 3`);
    return listCourse;
};
exports.listCourseName = async (name) => {
    const [listCourse] = await db.query(`SELECT * FROM courses WHERE name LIKE '%${name}%'`);
    return listCourse;
};
exports.listHot = async () => {
    const [listCourse] = await db.query("SELECT * FROM courses WHERE hot = 1");
    return listCourse;
};
