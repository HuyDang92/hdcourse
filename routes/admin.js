const express = require("express");
const router = express.Router();
const newsSite = require("../controller/adminController");
const multer = require("multer");
// Cấu hình multer để lưu ảnh vào thư mục /img/courses
const uploadCourse = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/courses");
    },
    filename: (req, file, cb) => {
        const fileName = `${file.originalname}`;
        cb(null, fileName);
    },
});

// Cho profile
const uploadAvt = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/avt"); // Thay đổi đường dẫn lưu trữ thành "/public/img/avt"
    },
    filename: (req, file, cb) => {
        const fileName = `${file.originalname}`;
        cb(null, fileName);
    },
});
/* GET users listing. */
router.post("/upload", multer({ storage: uploadCourse }).single("thumb"), (req, res) => {
    // File ảnh đã được lưu vào thư mục /img/courses
    res.status(200).end();
});
router.post("/uploadAvt", multer({ storage: uploadAvt }).single("avt"), (req, res) => {
    // File ảnh đã được lưu vào thư mục /public/img/avt
    res.status(200).end();
});
router.get("/profile", newsSite.profile);
router.get("/", newsSite.manager);
router.patch("/changePass", newsSite.changePass);
// router.put("/changeInfoHandle", newsSite.changeInfoHandle);

module.exports = router;
