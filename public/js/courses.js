import { Categories } from "./module/categories.js";
import { Courses } from "./module/courses.js";
import { Teachers } from "./module/teachers.js";
let currentUrl = window.location.href;
const url = currentUrl;
const id = Number(url.substring(url.lastIndexOf("/") + 1));
const name = String(url.substring(url.lastIndexOf("/") + 1));
const course = async () => {
    try {
        // Call api
        const [cates, teachers] = await Promise.all([
            Categories.getCat(`http://localhost:3000/api/categories`),
            Teachers.getTeachers(`http://localhost:3000/api/teachers`),
        ]);
        // HTML element cate
        const listCat = document.getElementById("allCat");
        let strCat = "";
        for (const cate of cates) {
            strCat += ` 
                <li>
                    <input type="checkbox" id="cat${cate.id}" />
                    <label for="cat${cate.id}">${cate.name}</label>
                </li>
                `;
        }
        listCat.insertAdjacentHTML("beforeend", strCat);
        // HTML element cate
        const listTeacher = document.getElementById("allTeacher");
        let strTeacher = "";
        for (const teacher of teachers) {
            strTeacher += ` 
                <li>
                    <input type="checkbox" id="teacher${teacher.id}" />
                    <label for="teacher${teacher.id}">${teacher.name}</label>
                </li>
                
                `;
        }
        listTeacher.insertAdjacentHTML("beforeend", strTeacher);
    }
    catch (error) {
        console.error(error);
    }
};
const courseCate = async () => {
    try {
        // Call api
        const [courses, cate] = await Promise.all([
            Courses.getCourseCate(`http://localhost:3000/api/courses/cate`, id),
            // Categories.getCat(`http://localhost:3000/api/categories`),
            // Teachers.getTeachers(`http://localhost:3000/api/teachers`),
            Categories.getCategoryById(`http://localhost:3000/api/categories`, id),
        ]);
        // HTML element cate
        const listCat = document.getElementById("catHeader");
        let strCat = "";
        console.log(cate);
        strCat += ` 
            <div class="d-flex flex-column justify-content-center" style="min-height: 300px">
                <h3 class="display-4 text-white text-uppercase">Khóa học</h3>
                <div class="d-inline-flex text-white">
                    <p class="m-0 text-uppercase"><a class="text-white" href="">Trang chủ</a></p>
                    <i class="fa fa-angle-double-right pt-1 px-3"></i>
                    <p class="m-0 text-uppercase">${cate === null || cate === void 0 ? void 0 : cate.name}</p>
                </div>
            </div>
            `;
        listCat.insertAdjacentHTML("beforeend", strCat);
        // courses
        const courseCat = document.getElementById("allCourseCat");
        let str = "";
        for (const course of courses) {
            str += `
            <div class="course-hot position-relative col-lg-6 col-md-6 mb-3">
                    <div class="rounded mb-1 shadow-sm">
                        <div class="thumb overflow-hidden position-relative">
                            <img class="img-fluid" src="/img/courses/${course.thumb}" alt="" />
                            <span><a href="/course/${course.id}">Xem khóa học</a></span>
                        </div>
                        <div class="info-course bg-secondary p-3 position-relative">
                            <div class="d-flex justify-content-between mb-2">
                                <small class="m-0"><i class="fa fa-users text-primary mr-2"></i>${course.followers} Học viên</small>
                                <small class="m-0"><i class="fa-solid fa-eye text-primary"></i> ${course.views}</small>
                            </div>
                            <a style="font-size: 1.1rem" class="h5" href="/course/${course.id}">${course.name}</a>
                            <div class="border-top mt-2 pt-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span style="font-size: 90%" class="m-0"
                                        ><i class="fa fa-star text-primary mr-1"></i>4.9 <small>(250)</small>
                                    </span>
                                    <h5 style="font-size: 95%" class="m-0 text-primary">
                                        ${course.price == 0 ? "Miễn Phí" : new Intl.NumberFormat("vi-VN").format(course.price)}
                                        <small>${course.price == 0 ? "" : "VNĐ"}</small>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
        }
        courseCat.insertAdjacentHTML("beforeend", str);
    }
    catch (error) {
        console.error(error);
    }
};
const courseSearch = async () => {
    try {
        // Call api
        const [courses] = await Promise.all([Courses.getCourseCate(`http://localhost:3000/api/courses/name`, name)]);
        // HTML element cate
        const listCat = document.getElementById("catHeader");
        let strCat = "";
        strCat += ` 
            <div class="d-flex flex-column justify-content-center" style="min-height: 300px">
                <h3 class="display-4 text-white text-uppercase">Khóa học</h3>
                <div class="d-inline-flex text-white">
                    <p class="m-0 text-uppercase"><a class="text-white" href="">Trang chủ</a></p>
                    <i class="fa fa-angle-double-right pt-1 px-3"></i>
                    <p class="m-0 text-uppercase">Tìm kiếm "${name}"</p>
                </div>
            </div>
            `;
        listCat.insertAdjacentHTML("beforeend", strCat);
        // courses
        const courseCat = document.getElementById("allCourseCat");
        let str = "";
        for (const course of courses) {
            str += `
            <div class="course-hot position-relative col-lg-6 col-md-6 mb-3">
                    <div class="rounded mb-1 shadow-sm">
                        <div class="thumb overflow-hidden position-relative">
                            <img class="img-fluid" src="/img/courses/${course.thumb}" alt="" />
                            <span><a href="/course/${course.id}">Xem khóa học</a></span>
                        </div>
                        <div class="info-course bg-secondary p-3 position-relative">
                            <div class="d-flex justify-content-between mb-2">
                                <small class="m-0"><i class="fa fa-users text-primary mr-2"></i>${course.followers} Học viên</small>
                                <small class="m-0"><i class="fa-solid fa-eye text-primary"></i> ${course.views}</small>
                            </div>
                            <a style="font-size: 1.1rem" class="h5" href="/course/${course.id}">${course.name}</a>
                            <div class="border-top mt-2 pt-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span style="font-size: 90%" class="m-0"
                                        ><i class="fa fa-star text-primary mr-1"></i>4.9 <small>(250)</small>
                                    </span>
                                    <h5 style="font-size: 95%" class="m-0 text-primary">
                                        ${course.price == 0 ? "Miễn Phí" : new Intl.NumberFormat("vi-VN").format(course.price)}
                                        <small>${course.price == 0 ? "" : "VNĐ"}</small>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
        }
        courseCat.insertAdjacentHTML("beforeend", str);
    }
    catch (error) {
        console.error(error);
    }
};
// courseSearch();
courseCate();
course();
