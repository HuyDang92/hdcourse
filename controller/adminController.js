const db = require("../models/db");
const bcrypt = require("bcrypt");
const modelUsers = require("../models/userModel");
const modelCates = require("../models/cateModel");
const modelTeachers = require("../models/teacherModel");
class NewsSite {
    async manager(req, res) {
        const info = req.session.info;
        const cates = await modelCates.list();
        const teachers = await modelTeachers.list();
        if (req.session.login) {
            if (info.role == 1) {
                res.render("admin/manager", { infoUser: info, cates: cates, teachers: teachers });
            } else {
                res.redirect("/");
            }
        } else {
            // req.session.back = "/admin"; //req.originalUrl
            res.redirect("/user");
        }
    }
    async profile(req, res) {
        const info = req.session.info;
        const user = await modelUsers.readOne(info.id);
        if (req.session.login) {
            res.render("admin/profile", { infoUser: user });
        } else {
            req.session.back = "/admin/profile"; //req.originalUrl
            res.redirect("/user");
        }
    }

    async changePass(req, res) {
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const info = req.session.info;
        const user = await modelUsers.readOneByEmail(info.email);
        const password = user.password;
        const kq = bcrypt.compareSync(oldPassword, password);
        if (kq) {
            const salt = bcrypt.genSaltSync(10);
            const passHash = bcrypt.hashSync(newPassword, salt);
            await db.query(`UPDATE users SET password = '${passHash}' WHERE email = '${user.email}'`);
            res.json({ susses: "Đổi mật khẩu thành công!" });
        } else {
            res.json({ err: "Mật khẩu cũ không đúng!" });
        }
    }
    // async changeInfoHandle(req, res) {
    //     const fullName = req.body.fullName;
    //     const email = req.body.email;
    //     const password = req.body.password;
    //     const phone = req.body.phone;
    //     const avt = req.body.avt;

    //     await db.query(`UPDATE users SET  WHERE email = '${user.email}'`);
    //     res.json({ susses: "Đổi mật khẩu thành công!" });
    // }
}
module.exports = new NewsSite();
