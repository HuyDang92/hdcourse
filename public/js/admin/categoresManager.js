import { Categories } from "../module/categories.js";
const getCategories = async () => {
    try {
        // Call api
        const [categories] = await Promise.all([Categories.getCat(`http://localhost:3000/api/categories`)]);
        // HTML element dom
        const table = document.getElementById("categories_list");
        let str = "";
        categories.forEach((item) => {
            str += ` <tr>
                        <th scope="row">${item.id}</th>
                        <td>${item.name}</td>
                        <td class="event_fuct" style="display: flex;">
                            <div class="update_item" style="cursor: pointer; margin-right: 1rem;" data-id-cat="${item.id}">
                                <span title="Sửa" class="material-symbols-outlined">edit</span>
                            </div>
                            <div class="remove_item" style="cursor: pointer;" data-id-cat="${item.id}">
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
                const removeItemCat = e.target.closest(".remove_item");
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
        // Sửa danh mục
        table.addEventListener("click", async (e) => {
            if (e.target instanceof HTMLElement) {
                const updateItemCat = e.target.closest(".update_item");
                const idCat = updateItemCat.dataset.idCat;
                if (updateItemCat) {
                    const id = Number(idCat);
                    const form = document.getElementById("addCategoryForm");
                    const btn = document.getElementById("btnSubmit");
                    const btnUD = document.getElementById("btnSubmitUD");
                    form.style.display = "block";
                    btn.style.display = "none";
                    btnUD.style.display = "block";
                    form.scrollIntoView({ behavior: "smooth" });
                    updateItem(id);
                }
            }
        });
    }
    catch (error) {
        console.error(error);
    }
};
const addItem = async () => {
    const btnSubmit = document.getElementById("btnSubmit");
    const form = document.getElementById("addCategoryForm");
    btnSubmit.addEventListener("click", async (e) => {
        const name = document.querySelector("#catName");
        Categories.addCat(`http://localhost:3000/api/categories`, name.value, "").then(() => {
            alert("Thêm danh mục thành công");
            location.reload();
        });
    });
};
let eventSubmit = null;
const updateItem = async (id) => {
    const table = document.getElementById("addCategoryForm");
    const btnUD = document.getElementById("btnSubmitUD");
    const name = document.querySelector("#catName");
    const title = document.getElementById("title_form_cat");
    const data = await Categories.getCategoryById(`http://localhost:3000/api/categories`, id);
    name.value = String(data === null || data === void 0 ? void 0 : data.name);
    title.innerHTML = "Sửa danh mục";
    if (eventSubmit) {
        table.removeEventListener("click", eventSubmit);
    }
    eventSubmit = (event) => {
        event.preventDefault();
        Categories.updateCat(`http://localhost:3000/api/categories`, id, name.value, "").then(() => {
            alert("Sửa thành công");
            location.reload();
        });
    };
    form.addEventListener("submit", function (event) {
        // Ngăn chặn sự kiện submit mặc định của form
        event.preventDefault();
    });
    btnUD.addEventListener("click", eventSubmit);
};
const deleteCat = async (id) => {
    Categories.deleteCat(`http://localhost:3000/api/categories`, id);
};
getCategories();
// Event
const form = document.getElementById("addCategoryForm");
const btnAdd = document.getElementById("btnAddCat");
const btnUD = document.getElementById("btnSubmitUD");
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
// Sự kiện submit form thêm danh mục
