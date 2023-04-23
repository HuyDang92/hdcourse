import { Categories } from "../module/categories.js";
import { Courses } from "./../module/courses.js";
const getCategories = async () => {
    try {
        // Call api
        const [categories, courses] = await Promise.all([
            Categories.getCat(`http://localhost:3000/api/categories`),
            Courses.getCourses(`http://localhost:3000/api/courses`),
        ]);
        // HTML element dom
        const table = document.getElementById("categories_list");
        let str = "";
        categories.forEach((item) => {
            str += ` <tr>
                        <th scope="row">${item.id}</th>
                        <td>${item.name}</td>
                        <td class="event_fuct" style="display: flex;">
                            <div class="update_item_cat" style="cursor: pointer; margin-right: 1rem;">
                                <span title="Sửa" class="material-symbols-outlined">edit</span>
                            </div>
                            <div class="remove_item_cat" style="cursor: pointer;" data-id-cat="${item.id}">
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
                const removeItemCat = e.target.closest(".remove_item_cat");
                const idCat = removeItemCat.dataset.idCat;
                if (confirm("Bạn chắc chắn muốn xóa 1 danh mục ?")) {
                    const id = Number(idCat);
                    await deleteCat(id);
                    const parentRemove_cat = removeItemCat.parentElement;
                    if (parentRemove_cat) {
                        (_a = parentRemove_cat.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
                    }
                    return;
                }
            }
        });
    }
    catch (error) {
        console.error(error);
    }
};
const deleteCat = async (id) => {
    Categories.deleteCat(`http://localhost:3000/api/categories`, id);
};
const addItem = async () => {
    const name = document.querySelector("#catName");
    await Categories.addCat(`http://localhost:3000/api/categories`, name.value, "");
};
getCategories();
//
const form = document.getElementById("addCategoryForm");
const btnAdd = document.getElementById("btnAddCat");
const btnSubmit = document.getElementById("btnSubmit");
btnAdd.addEventListener("click", () => {
    if (form.style.display == "block") {
        location.reload();
    }
    else {
        form.style.display = "block";
    }
    form.scrollIntoView({ behavior: "smooth" });
});
btnSubmit.addEventListener("click", addItem);
