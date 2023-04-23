import { Categories } from "./module/categories.js";
import { Courses, CourseDetail } from "./module/courses.js";
import { Teachers } from "./module/teachers.js";

let currentUrl: string = window.location.href;
const url: string = currentUrl;
const id: number = Number(url.substring(url.lastIndexOf("/") + 1));

const course = async (): Promise<void> => {
    try {
        // Call api
        const [course, courseDetail] = await Promise.all([
            Courses.getCourseById<number>(`http://localhost:3000/api/courses`, id),
            CourseDetail.getCourseDetail<number>(`http://localhost:3000/api/courses/route`, id),
        ]);
        const [cate, teacher] = await Promise.all([
            Categories.getCategoryById(`http://localhost:3000/api/categories`, String(course?.id_category)),
            Teachers.getTeacherById(`http://localhost:3000/api/teachers/`, course?.id_teacher || 0),
        ]);
        // HTML element dom
        const course_des = document.getElementById("course_des") as HTMLElement;
        const course_benefit = document.getElementById("course_benefit") as HTMLElement;
        const listWrapper = document.getElementById("card_course") as HTMLElement;
        // Gán content cho mô tả cho khóa học //
        course_des.innerHTML = course?.des || "";
        course_benefit.innerHTML = course?.benefit || "";
        let str: string = "";
        str += ` 
            <div style="border-radius: 30px" class="overflow-hidden mb-1 shadow-lg">
                <div class="thumb position-relative">
                    <img class="img-fluid" src="/img/courses/${course?.thumb}" alt="" />
                    <span><i class="fa-solid fa-play"></i></span>
                </div>
                <div class="info-course bg-secondary p-3 position-relative text-center">
                    <h4 class="text-primary text-center">
                    ${new Intl.NumberFormat("vi-VN").format(course?.price || 0)} <small>VNĐ</small>
                    </h4>
                    <div class="add-cart my-3 shadow" id="addCart">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span  class="ps-2">THÊM VÀO GIỎ HÀNG</span>
                    </div>
                    <div class="buy-course my-3 shadow">
                        <span>MUA NGAY</span>
                    </div>
                    <div class="action-cart d-flex justify-content-between my-2">
                        <div class="add-wishlist">
                            <i class="fa-solid fa-heart"></i>
                            <span>Lưu vào yêu thích</span>
                        </div>
                        <div class="share">
                            <i class="fa-solid fa-share"></i>
                            <span>Chia sẻ</span>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
              `;
        listWrapper.insertAdjacentHTML("beforeend", str);
        // Gán content cho danh mục điều hướng khóa học//
        const cate_body = document.getElementById("cate_body") as HTMLElement;
        let strCate: string = "";
        strCate += `
            <div class="d-flex flex-column justify-content-center" style="min-height: 300px">
                <h3 class="display-4 text-white text-uppercase">${course?.name}</h3>
                <div class="d-inline-flex text-white">
                    <p class="m-0 text-uppercase"><a class="text-white" href="/">Trang chủ</a></p>
                    <i class="fa fa-angle-double-right pt-1 px-3"></i>
                    <p class="m-0 text-uppercase">${cate?.name}</p>
                    <i class="fa fa-angle-double-right pt-1 px-3"></i>
                    <p class="m-0 text-uppercase">${course?.name}</p>
                </div>
            </div>`;
        cate_body.insertAdjacentHTML("beforeend", strCate);
        // Gán content con mục giáo viên khóa học //
        const teacherCourse = document.getElementById("teacher-course") as HTMLElement;
        let strTeacher: string = "";
        strTeacher += ` 
            <div class="d-flex container-teacher mt-5">
                <div class="col-lg-3">
                    <img src="/img/teacher/${teacher?.avatar}" alt="" />
                </div>
                <div class="col-lg-9">
                    <h5 class="text-primary">${teacher?.name}</h5>
                    <div class="rating-teacher">
                        <span style="margin-right: 2rem"> <i class="fa-solid fa-star text-primary"></i> ${teacher?.rating} </span>
                        <span> <i class="fa-solid fa-user-group text-primary"></i> ${teacher?.flollowers} </span>
                    </div>
                    <div class="introduce-teacher">
                        <p>${teacher?.introduce}</p>
                    </div>
                </div>
            </div>`;
        teacherCourse.insertAdjacentHTML("beforeend", strTeacher);
        // Gán content cho lộ trình khóa học
        const routeCourse = document.getElementById("routeCourse") as HTMLElement;
        let strRoute: string = "";
        for (const route of courseDetail) {
            strRoute += ` 
                <li class="d-flex justify-content-between py-3">
                    <div class="route_name">
                        <div class="route_title d-flex align-items-center">
                            <span class="">${route.count}</span>
                            <p class="m-0 p-0 px-2">${route.routes}</p>
                        </div>
                        <div class="route_content mx-5 pt-2">
                            <span><i class="fa-regular fa-circle-play"></i></span> <span>3 videos </span>
                        </div>
                    </div>
                    <div class="totalTime">
                        <span>${route.totalTime}</span>
                    </div>
                </li>
            `;
        }
        routeCourse.insertAdjacentHTML("beforeend", strRoute);
    } catch (error) {
        console.error(error);
    }
};

course();
// addd cart
const showPopup = (id: number): void => {
    // Lấy danh sách các idCourse đã lưu trong local storage
    const storedIds = localStorage.getItem("courseIds");
    // Chuyển đổi giá trị từ chuỗi JSON thành một mảng JavaScript
    const courseIds = storedIds ? JSON.parse(storedIds) : [];

    // Kiểm tra xem id đã tồn tại trong mảng courseIds hay chưa
    if (!courseIds.includes(id)) {
        // Nếu chưa tồn tại, thêm id vào mảng courseIds
        courseIds.push(id);
        // Lưu lại mảng courseIds vào local storage
        localStorage.setItem("courseIds", JSON.stringify(courseIds));
    }

    const popup = document.getElementById("popup") as HTMLElement;
    const overlay = document.querySelector(".overlay") as HTMLElement;
    if (popup && overlay) {
        popup.style.display = "block";
        overlay.style.display = "flex";
        setTimeout(() => {
            popup.classList.add("show");
            overlay.style.opacity = "1";
        }, 10);
    }
};

const closePopup = (): void => {
    const popup = document.getElementById("popup") as HTMLElement;
    const overlay = document.querySelector(".overlay") as HTMLElement;
    if (popup && overlay) {
        popup.classList.remove("show");
        overlay.style.opacity = "0";
        setTimeout(() => {
            popup.style.display = "none";
            overlay.style.display = "none";
        }, 300);
    }
};
setTimeout(() => {
    const addCartBtn = document.querySelector("#addCart") as HTMLElement;
    const closeBtn = document.querySelector(".overlay") as HTMLElement;
    addCartBtn.addEventListener("click", () => {
        console.log("sdfgh");

        showPopup(id); // Gọi hàm showPopup(id) trong hàm lắng nghe sự kiện
    });
    closeBtn.addEventListener("click", closePopup);
}, 2000);
