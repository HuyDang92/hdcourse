const db = require("./db");
exports.list = async () => {
    const [listCate] = await db.query("SELECT * FROM teachers");
    return listCate;
};
exports.listLimit = async () => {
    const [listCate] = await db.query(`SELECT * FROM teachers limit 4`);
    return listCate;
};
exports.readOne = async (id) => {
    const [oneCate] = await db.query(`SELECT * FROM teachers WHERE id = ${id}`);
    return oneCate[0];
};

exports.create = async (data) => {
    const [addCate] = await db.query(`INSERT INTO teachers SET ?`, data);
    return addCate;
};
exports.update = async (data, id) => {
    const [upCate] = await db.query(`UPDATE teachers  SET ? WHERE id = ?`, [data, id]);
    return upCate;
};
exports.delCate = async (id) => {
    const [delCate] = await db.query(`DELETE FROM teachers WHERE id = ${id}`);
    return delCate;
};
