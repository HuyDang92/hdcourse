const express = require("express");
const router = express.Router();
const modelUsers = require("../../models/userModel");

router.get("/", async (req, res) => {
    try {
        const data = await modelUsers.list();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await modelUsers.readOne(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/email/:email", async (req, res) => {
    const email = req.params.email;
    try {
        const user = await modelUsers.readOneByEmail(email);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        await modelUsers.create(data);
        res.json({ thongbao: "Đã đăng ký thành công" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        await modelUsers.update(data, id);
        res.json({ thongbao: "Đã cập nhật người dùng" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await modelUsers.delCate(id);
        res.json({ thongbao: "Đã xóa người dùng" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;
