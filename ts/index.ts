import { Categories } from "./module/categories.js";
import { Courses } from "./module/courses.js";
import { Teachers } from "./module/teachers.js";
import axios from "../node_modules/axios";
axios.get("http://localhost:3000/api/categories").then((response) => {});
const cateHeader = async (): Promise<void> => {
    const data = await Categories.getCat("http://localhost:3000/api/categories");
    const listWrapper = document.getElementById("listCate") as HTMLElement;
    let str: string = "";
    for (const row of data) {
        str += `<a href="/courses/${row.id}" class="nav-item nav-link">${row.name}</a>`;
    }
    listWrapper.insertAdjacentHTML("beforeend", str);
};
const cateSection = async (): Promise<void> => {
    const data = await Categories.getCat("http://localhost:3000/api/categories");
    const listWrapper = document.getElementById("secCate") as HTMLElement;
    let str: string = "";
    for (const row of data) {
        str += ` <div class="col-lg-4 col-md-6 mb-4">
                    <div class="cat-item position-relative overflow-hidden rounded mb-2">
                        <img class="img-fluid" src="${row.thumb}" alt="" />
                        <a class="cat-overlay text-white text-decoration-none" href="/courses/${row.id}">
                            <h4 class="text-white font-weight-medium">${row.name}</h4>
                            <span>100 Khóa học</span>
                        </a>
                    </div>
                </div>
                `;
    }
    listWrapper.insertAdjacentHTML("beforeend", str);
};
const courseSection = async (): Promise<void> => {
    const data = await Courses.getCourses("http://localhost:3000/api/courses/hot");
    const listWrapper = document.getElementById("secCourses") as HTMLElement;
    let str: string = "";
    for (const row of data) {
        str += ` <div class="course-hot position-relative col-lg-4 col-md-6 mb-3">
                    <div class="rounded mb-1 shadow-sm">
                        <div class="thumb overflow-hidden position-relative">
                            <img class="img-fluid" src="/img/courses/${row.thumb}" alt="" />
                            <span><a href="/course/${row.id}">Xem khóa học</a></span>
                        </div>
                        <label class="">HOT</label>
                        <div class="info-course bg-secondary p-3 position-relative">
                            <div class="d-flex justify-content-between mb-2">
                                <small class="m-0"><i class="fa fa-users text-primary mr-2"></i>${row.followers} Học viên</small>
                                <small class="m-0"><i class="fa-solid fa-eye text-primary"></i> ${row.views}</small>
                            </div>
                            <a style="font-size: 1.1rem" class="h5" href="/course/${row.id}">${row.name}</a>
                            <div class="border-top mt-2 pt-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span style="font-size: 90%" class="m-0"
                                        ><i class="fa fa-star text-primary mr-1"></i>4.9 <small>(250)</small>
                                    </span>
                                    <h5 style="font-size: 95%" class="m-0 text-primary">
                                        ${row.price == 0 ? "Miễn Phí" : new Intl.NumberFormat("vi-VN").format(row.price)}
                                        <small>${row.price == 0 ? "" : "VNĐ"}</small>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
    }
    listWrapper.insertAdjacentHTML("beforeend", str);
};
const courseSectionNew = async (): Promise<void> => {
    const data = await Courses.getCourses("http://localhost:3000/api/courses/new");
    const listWrapper = document.getElementById("secCoursesNew") as HTMLElement;
    let str: string = "";
    for (const row of data) {
        str += ` <div class="course-hot position-relative col-lg-4 col-md-6 mb-3">
                    <div class="rounded mb-1 shadow-sm">
                        <div class="thumb overflow-hidden position-relative">
                            <img class="img-fluid" src="/img/courses/${row.thumb}" alt="" />
                            <span><a href="/course/${row.id}">Xem khóa học</a></span>
                        </div>
                        <label class="">HOT</label>
                        <div class="info-course bg-secondary p-3 position-relative">
                            <div class="d-flex justify-content-between mb-2">
                                <small class="m-0"><i class="fa fa-users text-primary mr-2"></i>${row.followers} Học viên</small>
                                <small class="m-0"><i class="fa-solid fa-eye text-primary"></i> ${row.views}</small>
                            </div>
                            <a style="font-size: 1.1rem" class="h5" href="/course/${row.id}">${row.name}</a>
                            <div class="border-top mt-2 pt-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span style="font-size: 90%" class="m-0"
                                        ><i class="fa fa-star text-primary mr-1"></i>4.9 <small>(250)</small>
                                    </span>
                                    <h5 style="font-size: 95%" class="m-0 text-primary">
                                        ${row.price == 0 ? "Miễn Phí" : new Intl.NumberFormat("vi-VN").format(row.price)}
                                        <small>${row.price == 0 ? "" : "VNĐ"}</small>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
    }
    listWrapper.insertAdjacentHTML("beforeend", str);
};
const courseSectioView = async (): Promise<void> => {
    const data = await Courses.getCourses("http://localhost:3000/api/courses/topview");
    const listWrapper = document.getElementById("secCoursesView") as HTMLElement;
    let str: string = "";
    for (const row of data) {
        str += ` <div class="course-hot position-relative col-lg-4 col-md-6 mb-3">
                    <div class="rounded mb-1 shadow-sm">
                        <div class="thumb overflow-hidden position-relative">
                            <img class="img-fluid" src="/img/courses/${row.thumb}" alt="" />
                            <span><a href="/course/${row.id}">Xem khóa học</a></span>
                        </div>
                        <label class="">HOT</label>
                        <div class="info-course bg-secondary p-3 position-relative">
                            <div class="d-flex justify-content-between mb-2">
                                <small class="m-0"><i class="fa fa-users text-primary mr-2"></i>${row.followers} Học viên</small>
                                <small class="m-0"><i class="fa-solid fa-eye text-primary"></i> ${row.views}</small>
                            </div>
                            <a style="font-size: 1.1rem" class="h5" href="/course/${row.id}">${row.name}</a>
                            <div class="border-top mt-2 pt-2">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span style="font-size: 90%" class="m-0"
                                        ><i class="fa fa-star text-primary mr-1"></i>4.9 <small>(250)</small>
                                    </span>
                                    <h5 style="font-size: 95%" class="m-0 text-primary">
                                        ${row.price == 0 ? "Miễn Phí" : new Intl.NumberFormat("vi-VN").format(row.price)}
                                        <small>${row.price == 0 ? "" : "VNĐ"}</small>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
    }
    listWrapper.insertAdjacentHTML("beforeend", str);
};
const teacherSection = async (): Promise<void> => {
    const data = await Teachers.getTeachers("http://localhost:3000/api/teachers/top");
    const listWrapper = document.getElementById("secTeachers") as HTMLElement;
    let str: string = "";
    for (const row of data) {
        str += ` <div class="col-md-6 col-lg-3 text-center team mb-4">
                    <div class="team-item rounded overflow-hidden mb-2">
                        <div class="team-img position-relative overflow-hidden">
                            <img class="img-fluid" src="img/teacher/${row.avatar}" alt="" />
                            <div class="team-social">
                                <a class="btn btn-outline-light btn-square mx-1" href="#"><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-outline-light btn-square mx-1" href="#"><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-outline-light btn-square mx-1" href="#"><i class="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                        <div class="bg-secondary p-4">
                            <h6 style="font-size: 95%">${row.name}</h6>
                            <small class="m-0">Thiết kế web</small>
                        </div>
                    </div>
                </div>
                `;
    }
    listWrapper.insertAdjacentHTML("beforeend", str);
};
cateHeader();
cateSection();
courseSection();
courseSectionNew();
courseSectioView();
teacherSection();
