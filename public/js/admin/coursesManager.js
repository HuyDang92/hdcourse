import { Categories } from "../module/categories.js";
import { Courses } from "../module/courses.js";
import { Teachers } from "../module/teachers.js";
const getCourses = async () => {
    try {
        // Call api
        const [categories, courses, teachers] = await Promise.all([
            Categories.getCat(`http://localhost:3000/api/categories`),
            Courses.getCourses(`http://localhost:3000/api/courses`),
            Teachers.getTeachers(`http://localhost:3000/api/teachers`),
        ]);
        // HTML element dom
        const table = document.getElementById("course_list");
        let str = "";
        courses.forEach((item) => {
            str += ` <tr>
                        <th scope="row">${item.id}</th>
                        <td>${item.id_category}</td>
                        <td>${item.name}</td>
                        <td>${new Intl.NumberFormat("vi-VN").format(item.price)} VNĐ</td>
                        <td><img  style="width: 5rem" src="/img/courses/${item.thumb}" alt=""></td>
                        <td class="event_fuct" style="display: flex;">
                            <div id="addCart" class="detail_item" style="cursor: pointer; margin-right: 1rem;" data-id-course="${item.id}">
                                <span class="material-symbols-outlined">info</span>
                            </div>
                            <div class="update_item" style="cursor: pointer; margin-right: 1rem;" data-id-course="${item.id}">
                                <span title="Sửa" class="material-symbols-outlined">edit</span>
                            </div>
                            <div class="remove_item" style="cursor: pointer;" data-id-course="${item.id}">
                                <span title="Xóa" class="material-symbols-outlined">delete</span>
                            </div>
                        </td>
                    </tr>`;
        });
        table.insertAdjacentHTML("beforeend", str);
        // xóa danh mục
        table.addEventListener("click", async (e) => {
            var _a;
            e.preventDefault();
            if (e.target instanceof HTMLElement) {
                const removeItem = e.target.closest(".remove_item");
                if (removeItem) {
                    const idCourse = removeItem.dataset.idCourse;
                    if (confirm("Bạn chắc chắn muốn xóa 1 khóa học ?")) {
                        const id = Number(idCourse);
                        await deleteCourse(id);
                        const parentRemove_cat = removeItem.parentElement;
                        if (parentRemove_cat) {
                            (_a = parentRemove_cat.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
                        }
                        return;
                    }
                }
            }
        });
        // Sửa danh mục
        table.addEventListener("click", async (e) => {
            e.preventDefault();
            if (e.target instanceof HTMLElement) {
                const updateItem = e.target.closest(".update_item");
                if (updateItem) {
                    const idCourse = updateItem.dataset.idCourse;
                    const id = Number(idCourse);
                    const form = document.getElementById("addCourseForm");
                    const btn = document.getElementById("btnSubmitCourse");
                    const btnUD = document.getElementById("btnSubmitCourseUD");
                    form.style.display = "block";
                    btn.style.display = "none";
                    btnUD.style.display = "block";
                    form.scrollIntoView({ behavior: "smooth" });
                    updateCourse(id);
                }
            }
        });
        table.addEventListener("click", async (e) => {
            e.preventDefault();
            if (e.target instanceof HTMLElement) {
                const detailItem = e.target.closest(".detail_item");
                if (detailItem) {
                    const idCourse = detailItem.dataset.idCourse;
                    showPopup(Number(idCourse)); // Gọi hàm showPopup(id) trong hàm lắng nghe sự kiện
                }
            }
        });
    }
    catch (error) {
        console.error(error);
    }
};
const addItem = async () => {
    const btnSubmitCourse = document.getElementById("btnSubmitCourse");
    const idCat = document.getElementById("category");
    const idTeacher = document.getElementById("teacher");
    const name = document.getElementById("productName");
    const price = document.getElementById("price");
    const thumb = document.getElementById("thumb");
    const des = document.getElementById("details");
    const benefit = document.getElementById("benefit");
    btnSubmitCourse.addEventListener("click", async (e) => {
        const thumbFile = thumb.files && thumb.files.length > 0 ? thumb.files[0] : "";
        if (thumbFile) {
            const formData = new FormData();
            formData.append("thumb", thumbFile);
            await fetch("http://localhost:3000/admin/upload", {
                method: "POST",
                body: formData,
            });
            console.log("Đã upload ảnh thành công!");
        }
        const data = {
            id_category: idCat.value,
            id_teacher: idTeacher.value,
            name: name.value,
            price: price.value,
            thumb: thumb.files && thumb.files.length > 0 ? thumb.files[0].name : "errImg",
            des: des.value,
            benefit: benefit.value,
        };
        Courses.addCourse(`http://localhost:3000/api/courses`, data).then(() => {
            alert("Thêm khóa học thành công");
            location.reload();
        });
    });
};
let eventSubmit = null;
const updateCourse = async (id) => {
    const table = document.getElementById("addCategoryForm");
    const btnUD = document.getElementById("btnSubmitCourseUD");
    const idCat = document.getElementById("category");
    const idTeacher = document.getElementById("teacher");
    const name = document.getElementById("productName");
    const price = document.getElementById("price");
    const thumb = document.getElementById("thumb");
    const imageContainer = document.getElementById("image-container-ud");
    const des = document.getElementById("details");
    const benefit = document.getElementById("benefit");
    const title = document.getElementById("title_form_cat");
    const data = await Courses.getCourseById(`http://localhost:3000/api/courses`, id);
    title.innerHTML = "Sửa khóa học";
    idCat.value = String(data === null || data === void 0 ? void 0 : data.id_category);
    idTeacher.value = String(data === null || data === void 0 ? void 0 : data.id_teacher);
    name.value = String(data === null || data === void 0 ? void 0 : data.name);
    price.value = String(data === null || data === void 0 ? void 0 : data.price);
    imageContainer.src = `/img/courses/${String(data === null || data === void 0 ? void 0 : data.thumb)}`;
    des.value = String(data === null || data === void 0 ? void 0 : data.des);
    benefit.value = String(data === null || data === void 0 ? void 0 : data.benefit);
    if (eventSubmit) {
        table.removeEventListener("submit", eventSubmit);
    }
    eventSubmit = (event) => {
        event.preventDefault();
        const data = {
            id_category: idCat.value,
            id_teacher: idTeacher.value,
            name: name.value,
            price: price.value,
            thumb: thumb.files && thumb.files.length > 0 ? thumb.files[0].name : "errImg",
            des: des.value,
            benefit: benefit.value,
        };
        Courses.updateCourse(`http://localhost:3000/api/courses`, id, data).then(() => {
            alert("Sửa thành công");
            location.reload();
        });
    };
    form.addEventListener("submit", function (event) {
        // Ngăn chặn sự kiện submit mặc định của form
        event.preventDefault();
        btnUD.addEventListener("click", eventSubmit);
    });
};
const deleteCourse = async (id) => {
    Courses.deleteCourse(`http://localhost:3000/api/courses`, id);
};
// // Event
const form = document.getElementById("addCourseForm");
const btnAdd = document.getElementById("btnAddCourse");
const btnUD = document.getElementById("btnSubmitCourseUD");
// Sự kiện click hiện ra form thêm danh mục
btnAdd.addEventListener("click", () => {
    if (form.style.display == "block") {
        location.reload();
    }
    else {
        form.style.display = "block";
        btnUD.style.display = "none";
        addItem();
    }
    form.scrollIntoView({ behavior: "smooth" });
});
getCourses();
// addd cart
const showPopup = async (id) => {
    const course = await Courses.getCourseById(`http://localhost:3000/api/courses`, id);
    const popup = document.getElementById("popup");
    const overlay = document.querySelector(".overlayCourse");
    if (popup && overlay) {
        popup.style.display = "block";
        overlay.style.display = "flex";
        setTimeout(() => {
            popup.classList.add("show");
            overlay.style.opacity = "1";
        }, 10);
    }
    const popUp = document.getElementById("course_detail");
    let str = `
        <p><b>Mã</b>: ${course === null || course === void 0 ? void 0 : course.id}</p>
        <p><b>Mã danh mục</b>: ${course === null || course === void 0 ? void 0 : course.id_category}</p>
        <p><b>Tên khóa học</b>: ${course === null || course === void 0 ? void 0 : course.name}</p>
        <p><b>Giá</b>: ${new Intl.NumberFormat("vi-VN").format((course === null || course === void 0 ? void 0 : course.price) || 0)}</p>
        <p><b>Ảnh</b>: <img  style="width: 5rem" src="/img/courses/${course === null || course === void 0 ? void 0 : course.thumb}" alt=""></p>
        <p><b>Học viên: ${course === null || course === void 0 ? void 0 : course.followers}</b></p>
        <p><b>Lượt xem: ${course === null || course === void 0 ? void 0 : course.views}</b></p>
        <p><b>Mô tả</b>: ${course === null || course === void 0 ? void 0 : course.des}</p>
    `;
    popUp.innerHTML = str;
};
const closePopup = () => {
    const popup = document.getElementById("popup");
    const overlay = document.querySelector(".overlayCourse");
    if (popup && overlay) {
        popup.classList.remove("show");
        overlay.style.opacity = "0";
        setTimeout(() => {
            popup.style.display = "none";
            overlay.style.display = "none";
        }, 300);
    }
};
// setTimeout(() => {
//     const addCartBtn = document.querySelector("#addCart") as HTMLElement;
//     addCartBtn.addEventListener("click", (e) => {
//         const idCourse = addCartBtn.dataset.idCourse;
//         showPopup(Number(idCourse)); // Gọi hàm showPopup(id) trong hàm lắng nghe sự kiện
//     });
// }, 3000);
const closeBtn = document.querySelector(".overlayCourse");
closeBtn.addEventListener("click", closePopup);
