const db = require("../models/db");
const bcrypt = require("bcrypt");
const modelUsers = require("../models/userModel");
class NewsSite {
    login(req, res) {
        res.render("user/log-in");
    }
    newPass(req, res) {
        res.render("user/newPassword");
    }
    forgotPass(req, res) {
        res.render("user/forgotPass");
    }
    async regisHandle(req, res) {
        const fullname = req.body.fullname;
        const email = req.body.email;
        const password = String(req.body.password);
        const salt = bcrypt.genSaltSync(10);
        const passHash = bcrypt.hashSync(password, salt);
        const data = { fullname: fullname, email: email, password: passHash, avatar: "avt.avif" };
        await modelUsers.create(data);
        res.json({ mes: "Đăng ký thành công!" });
        // res.redirect("/user");
    }
    async loginHandle(req, res) {
        const email = req.body.email;
        const password = String(req.body.password);
        const [listUser] = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
        const passDB = listUser[0].password;
        const kq = bcrypt.compareSync(password, passDB);
        if (kq) {
            const sess = req.session; //initialize session variable
            sess.login = true;
            sess.info = {
                id: listUser[0].id,
                fullname: listUser[0].fullname,
                email: listUser[0].email,
                avatar: listUser[0].avatar,
                phone: listUser[0].phone,
                role: listUser[0].role,
            };
            if (sess.back) {
                res.json({ mes: sess.back });
            } else {
                res.json({ mes: "/", data: listUser[0] });
            }
        } else {
            res.json({ err: "Tài khoản hoặc mật khẩu không chính xác!" });
        }
    }
    async forgotPassHandle(req, res) {
        const emailForgot = req.body.emailForgot;
        const user = await modelUsers.readOneByEmail(emailForgot);
        if (!user) {
            res.json({ err: "Email không tồn tại!" });
        } else {
            const sess = req.session; //initialize session variable
            sess.emailForgot = emailForgot;
            res.json({ susses: "/user/newPass" });
        }
        // res.json({ susses: "Đổi mật khẩu thành công!" });
    }
    async changePassHandle(req, res) {
        const email = req.session.emailForgot;
        const newPassword = req.body.newPassword;
        const salt = bcrypt.genSaltSync(10);
        const passHash = bcrypt.hashSync(newPassword, salt);
        await db.query(`UPDATE users SET password = '${passHash}' WHERE email = '${email}'`);
        res.json({ susses: "Đổi mật khẩu thành công!" });
    }
}
module.exports = new NewsSite();
