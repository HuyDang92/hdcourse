const express = require("express");
const router = express.Router();
const modelCat = require("../../models/cateModel");

router.get("/", async (req, res) => {
    try {
        const data = await modelCat.list();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await modelCat.readOne(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        await modelCat.create(data);
        res.json({ thongbao: "Đã thêm xong một danh mục mới" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        await modelCat.update(data, id);
        res.json({ thongbao: "Đã cập nhật danh mục" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await modelCat.delCate(id);
        res.json({ thongbao: "Đã xóa danh mục" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;
