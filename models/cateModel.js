const db = require("./db");
exports.list = async () => {
    const [listCate] = await db.query("SELECT * FROM categories");
    return listCate;
};
exports.readOne = async (id) => {
    const [oneCate] = await db.query(`SELECT * FROM categories WHERE id = ${id}`);
    return oneCate[0];
};

exports.create = async (data) => {
    const [addCate] = await db.query(`INSERT INTO categories SET ?`, data);
    return addCate;
};
exports.update = async (data, id) => {
    const [upCate] = await db.query(`UPDATE categories  SET ? WHERE id = ?`, [data, id]);
    return upCate;
};
exports.delCate = async (id) => {
    const [delCate] = await db.query(`DELETE FROM categories WHERE id = ${id}`);
    return delCate;
};
