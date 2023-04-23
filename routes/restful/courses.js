const express = require("express");
const router = express.Router();
const model = require("../../models/courseModel");

router.get("/", async (req, res) => {
    try {
        const data = await model.list();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/name/:name", async (req, res) => {
    const name = req.params.name;
    try {
        const data = await model.listCourseName(name);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/hot", async (req, res) => {
    try {
        const data = await model.listHot();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/topview", async (req, res) => {
    try {
        const data = await model.listCourseTopView();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/new", async (req, res) => {
    try {
        const data = await model.listCourseNew();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/cate/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await model.listCourseCat(id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/route/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await model.listRoute(id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await model.readOne(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        await model.create(data);
        res.json({ thongbao: "Đã thêm xong một khóa học mới" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        await model.update(data, id);
        res.json({ thongbao: "Đã cập nhật khóa học" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await model.delCourse(id);
        res.json({ thongbao: "Đã xóa khóa học" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;
