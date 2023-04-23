const express = require("express");
const router = express.Router();
const newsSite = require("../controller/userController");

/* GET users listing. */
router.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/");
});
router.post("/loginHandle", newsSite.loginHandle);
router.post("/regisHandle", newsSite.regisHandle);
router.post("/forgotPassHandle", newsSite.forgotPassHandle);
router.patch("/changePassHandle", newsSite.changePassHandle);
router.get("/newPass", newsSite.newPass);
router.get("/forgotPass", newsSite.forgotPass);
router.get("/", newsSite.login);

module.exports = router;
