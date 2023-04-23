const db = require("./db");

exports.list = async () => {
    const [listUser] = await db.query("SELECT * FROM users");
    return listUser;
};
exports.readOne = async (id) => {
    const [oneUser] = await db.query(`SELECT * FROM users WHERE id = ${id}`);
    return oneUser[0];
};
exports.readOneByEmail = async (email) => {
    const [oneUser] = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
    return oneUser[0];
};

exports.create = async (data) => {
    const [addUser] = await db.query(`INSERT INTO users SET ?`, data);
    return addUser;
};
exports.update = async (data, id) => {
    const [upUser] = await db.query(`UPDATE users  SET ? WHERE id = ?`, [data, id]);
    return upUser;
};
exports.del = async (id) => {
    const [delUser] = await db.query(`DELETE FROM users WHERE id = ${id}`);
    return delUser;
};
