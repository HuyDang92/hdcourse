import { Categories } from "./module/categories.js";
import { Courses, CourseDetail } from "./module/courses.js";
import { Teachers } from "./module/teachers.js";

const idCourse = Number(localStorage.getItem("courseId"));
const getStoredIds = (): number[] => {
    const storedIds = localStorage.getItem("courseIds");
    if (storedIds) {
        return JSON.parse(storedIds);
    } else {
        return [];
    }
};

const addRowCourse = async (): Promise<void> => {
    const storedIds = getStoredIds(); // Lấy danh sách các idCourse đã lưu trong localStorage
    const listWrapper = document.getElementById("rowCourse") as HTMLElement;

    // Duyệt qua danh sách các idCourse đã lưu và thêm dòng vào bảng danh sách khóa học
    for (const idCourse of storedIds) {
        const course = await Courses.getCourseById<number>(`http://localhost:3000/api/courses`, idCourse);

        let str: string = "";
        str += ` 
            <tr>
                <td class="product__cart__item d-flex  align-items-center">
                    <div class="product__cart__item__pic">
                        <img style="width: 5rem" src="/img/courses/${course?.thumb}" alt="" />
                    </div>
                    <div class="product__cart__item__text">
                        <h6>${course?.name}</h6>
                        <h5>${new Intl.NumberFormat("vi-VN").format(course?.price || 0)}</h5>
                    </div>
                </td>
                <td class="quantity__item">
                    <div class="quantity">
                        <div class="pro-qty-2">
                            <input type="text" value="1" />
                        </div>
                    </div>
                </td>
                <td class="cart__price">${new Intl.NumberFormat("vi-VN").format(course?.price || 0)}</td>
                <td class="cart__close" data-id-course="${course?.id}"><i class="fa fa-close"></i></td>
            </tr> `;
        listWrapper.insertAdjacentHTML("beforeend", str);
        listWrapper.addEventListener("click", async (e) => {
            e.preventDefault();
            if (e.target instanceof HTMLElement) {
                const detailItem = e.target.closest(".cart__close") as HTMLElement;
                if (detailItem) {
                    const idCourse = detailItem.dataset.idCourse;
                    await deleteCourseById(Number(idCourse)); // Gọi hàm showPopup(id) trong hàm lắng nghe sự kiện
                    detailItem.parentElement?.remove();
                }
            }
        });
    }
};

addRowCourse();
const storedIds = localStorage.getItem("courseIds");
// Chuyển đổi giá trị từ chuỗi JSON thành một mảng JavaScript
const courseIds = storedIds ? JSON.parse(storedIds) : [];

// Hàm xử lý khi onclick button
function deleteCourseById(id: number) {
    // Tìm vị trí của id trong mảng courseIds
    const index = courseIds.indexOf(id);
    // Kiểm tra nếu id tồn tại trong mảng courseIds, thì xóa phần tử đó ra khỏi mảng
    if (index !== -1) {
        courseIds.splice(index, 1);
        // Cập nhật lại giá trị của courseIds vào local storage
        localStorage.setItem("courseIds", JSON.stringify(courseIds));
    }
}
