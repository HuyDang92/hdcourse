const express = require("express");
const router = express.Router();
const newsSite = require("../controller/siteController");
/* GET users listing. */
router.post("/search", newsSite.search);
router.get("/teachers", newsSite.teachers);
router.get("/courses/:id", newsSite.cateById);
router.get("/courses/page/:page", newsSite.courses);
router.get("/cart", newsSite.cart);
router.get("/about", newsSite.about);
router.get("/contact", newsSite.contact);
router.get("/course/:id", newsSite.courseDetail);
router.get("/", newsSite.index);

module.exports = router;
