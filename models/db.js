// //Database trả về kết nối với cơ sở dữ liệu (Dùng callback)
// const mysql = require("mysql2");
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "hdcourse",
// });
// db.connect(() => console.log("Da ket noi database !"));

// Dùng promise
const mysql = require("mysql2/promise");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "hdcourse",
});
db.getConnection()
    .then((connection) => {
        console.log("Successfully connected to database!");
        connection.end;
    })
    .catch((err) => {
        console.log(`Error connecting to database: ${err}`);
    });

module.exports = db;
//lệnh exports để xuất (public) ra, cho ngoài module dùng được db
