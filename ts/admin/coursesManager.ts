import { Categories } from "../module/categories.js";
import { Courses, CourseDetail } from "../module/courses.js";
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
        const table = document.getElementById("course_list") as HTMLElement;
        let str: string = "";
        courses.forEach((item: any) => {
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
            e.preventDefault();
            if (e.target instanceof HTMLElement) {
                const removeItem = e.target.closest(".remove_item") as HTMLElement;
                if (removeItem) {
                    const idCourse = removeItem.dataset.idCourse;
                    if (confirm("Bạn chắc chắn muốn xóa 1 khóa học ?")) {
                        const id = Number(idCourse);
                        await deleteCourse(id);
                        const parentRemove_cat = removeItem.parentElement;
                        if (parentRemove_cat) {
                            parentRemove_cat.parentElement?.remove();
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
                const updateItem = e.target.closest(".update_item") as HTMLElement;
                if (updateItem) {
                    const idCourse = updateItem.dataset.idCourse;
                    const id = Number(idCourse);
                    const form = document.getElementById("addCourseForm") as HTMLFormElement;
                    const btn = document.getElementById("btnSubmitCourse") as HTMLElement;
                    const btnUD = document.getElementById("btnSubmitCourseUD") as HTMLElement;

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
                const detailItem = e.target.closest(".detail_item") as HTMLElement;
                if (detailItem) {
                    const idCourse = detailItem.dataset.idCourse;
                    showPopup(Number(idCourse)); // Gọi hàm showPopup(id) trong hàm lắng nghe sự kiện
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
};

const addItem = async () => {
    const btnSubmitCourse = document.getElementById("btnSubmitCourse") as HTMLInputElement;
    const idCat = document.getElementById("category") as HTMLInputElement;
    const idTeacher = document.getElementById("teacher") as HTMLInputElement;
    const name = document.getElementById("productName") as HTMLInputElement;
    const price = document.getElementById("price") as HTMLInputElement;
    const thumb = document.getElementById("thumb") as HTMLInputElement;
    const des = document.getElementById("details") as HTMLInputElement;
    const benefit = document.getElementById("benefit") as HTMLInputElement;

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
        Courses.addCourse<Object>(`http://localhost:3000/api/courses`, data).then(() => {
            alert("Thêm khóa học thành công");
            location.reload();
        });
    });
};
let eventSubmit: any = null;
const updateCourse = async (id: number) => {
    const table = document.getElementById("addCategoryForm") as HTMLElement;
    const btnUD = document.getElementById("btnSubmitCourseUD") as HTMLElement;
    const idCat = document.getElementById("category") as HTMLInputElement;
    const idTeacher = document.getElementById("teacher") as HTMLInputElement;
    const name = document.getElementById("productName") as HTMLInputElement;
    const price = document.getElementById("price") as HTMLInputElement;
    const thumb = document.getElementById("thumb") as HTMLInputElement;
    const imageContainer = document.getElementById("image-container-ud") as HTMLImageElement;
    const des = document.getElementById("details") as HTMLInputElement;
    const benefit = document.getElementById("benefit") as HTMLInputElement;
    const title = document.getElementById("title_form_cat") as HTMLElement;
    const data = await Courses.getCourseById<number>(`http://localhost:3000/api/courses`, id);
    title.innerHTML = "Sửa khóa học";
    idCat.value = String(data?.id_category);
    idTeacher.value = String(data?.id_teacher);
    name.value = String(data?.name);
    price.value = String(data?.price);
    imageContainer.src = `/img/courses/${String(data?.thumb)}`;
    des.value = String(data?.des);
    benefit.value = String(data?.benefit);
    if (eventSubmit) {
        table.removeEventListener("submit", eventSubmit);
    }
    eventSubmit = (event: Event) => {
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
        Courses.updateCourse<Object>(`http://localhost:3000/api/courses`, id, data).then(() => {
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
const deleteCourse = async (id: number) => {
    Courses.deleteCourse(`http://localhost:3000/api/courses`, id);
};
// // Event
const form = document.getElementById("addCourseForm") as HTMLFormElement;
const btnAdd = document.getElementById("btnAddCourse") as HTMLElement;
const btnUD = document.getElementById("btnSubmitCourseUD") as HTMLElement;

// Sự kiện click hiện ra form thêm danh mục
btnAdd.addEventListener("click", () => {
    if (form.style.display == "block") {
        location.reload();
    } else {
        form.style.display = "block";
        btnUD.style.display = "none";
        addItem();
    }
    form.scrollIntoView({ behavior: "smooth" });
});
getCourses();
// addd cart
const showPopup = async (id: number): Promise<void> => {
    const course = await Courses.getCourseById<number>(`http://localhost:3000/api/courses`, id);

    const popup = document.getElementById("popup") as HTMLElement;
    const overlay = document.querySelector(".overlayCourse") as HTMLElement;
    if (popup && overlay) {
        popup.style.display = "block";
        overlay.style.display = "flex";
        setTimeout(() => {
            popup.classList.add("show");
            overlay.style.opacity = "1";
        }, 10);
    }
    const popUp = document.getElementById("course_detail") as HTMLElement;
    let str: string = `
        <p><b>Mã</b>: ${course?.id}</p>
        <p><b>Mã danh mục</b>: ${course?.id_category}</p>
        <p><b>Tên khóa học</b>: ${course?.name}</p>
        <p><b>Giá</b>: ${new Intl.NumberFormat("vi-VN").format(course?.price || 0)}</p>
        <p><b>Ảnh</b>: <img  style="width: 5rem" src="/img/courses/${course?.thumb}" alt=""></p>
        <p><b>Học viên: ${course?.followers}</b></p>
        <p><b>Lượt xem: ${course?.views}</b></p>
        <p><b>Mô tả</b>: ${course?.des}</p>
    `;

    popUp.innerHTML = str;
};
const closePopup = (): void => {
    const popup = document.getElementById("popup") as HTMLElement;
    const overlay = document.querySelector(".overlayCourse") as HTMLElement;
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
const closeBtn = document.querySelector(".overlayCourse") as HTMLElement;
closeBtn.addEventListener("click", closePopup);
